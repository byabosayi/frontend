'use client'

import {useEffect, useRef, useState, useTransition} from 'react'
import api from '@/libs/axios' // your configured axios
import Table from './Table' // the UI-only component (your current Table)

const DEFAULT_LIMIT = 10

/**
 * @param {Object} props
 * @param {string} props.endpoint                      // e.g. '/retailer/products'
 * @param {Object} [props.baseParams]                  // always sent (e.g. {user_id:3})
 * @param {Array} props.headCells
 * @param {string} [props.title]
 * @param {Array} [props.actions]                      // [{name, method, endpoint?, body?}]
 * @param {Array} [props.filters]                      // [{id,name,items:[{id,name,params}]}]
 * @param {Object} props.hrefs                         // {root, create}
 */
export default function TableApi({
  title = '',
  headCells = [],
  endpoint,
  baseParams = {},
  actions = [],
  filters = [],
  hrefs,
  avatarKey = 'image',
}) {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    ...baseParams,
  })
  const [isPending, startTransition] = useTransition()
  const searchTimeout = useRef(null)

  // initial load
  useEffect(() => {
    fetchData(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async (p) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(endpoint, {params: p})
      setRows(res.data?.data ?? [])
      setTotal(res.data?.total ?? 0)
    } catch (e) {
      console.error(e)
      setError(e)
      setRows([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  // ---- handlers used by Table ----
  const handleSearch = (search) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      const next = {...params, search, page: 1}
      setParams(next)
      startTransition(() => fetchData(next))
    }, 300)
  }

  const handlePageChange = (page, perPage) => {
    const next = {...params, page, limit: perPage}
    setParams(next)
    startTransition(() => fetchData(next))
  }

  const handleRowsPerPageChange = (perPage) => {
    const next = {...params, limit: perPage, page: 1}
    setParams(next)
    startTransition(() => fetchData(next))
  }

  const handleSingleDelete = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`)
      // refetch current page
      startTransition(() => fetchData(params))
    } catch (e) {
      console.error('Delete failed', e)
    }
  }

  const handleBulkAction = async (action, ids) => {
    try {
      const url = action.endpoint || `${endpoint}`
      await api.request({
        url,
        method: action.method || 'PUT',
        data: action.body ? {...action.body, ids} : {ids},
      })
      startTransition(() => fetchData(params))

      // if it's a delete, remove/clear deleted ids from selected rows because it's still showing in slected Action!
    } catch (e) {
      console.error(`${action.name} failed`, e)
    }
  }

  const wrappedActions = actions.map((a) => ({
    name: a.name,
    method: (ids) => handleBulkAction(a, ids),
  }))

  const onFilter = (extraParams) => {
    const next = {...params, ...extraParams, page: 1}
    setParams(next)
    startTransition(() => fetchData(next))
  }

  const adaptedFilters = filters.map((g) => ({
    ...g,
    items: g.items.map((it) => ({
      ...it,
      onFilter: () => onFilter(it.params || {}),
    })),
  }))

  return (
    <Table
      title={title}
      headCells={headCells}
      rows={rows}
      totalRows={total}
      actions={wrappedActions}
      filters={adaptedFilters}
      hrefs={hrefs}
      loading={loading || isPending}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowDelete={handleSingleDelete}
      error={error}
      avatarKey={avatarKey}
    />
  )
}
