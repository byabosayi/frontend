'use client'

import {
  Box,
  Checkbox,
  LinearProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Avatar,
  Stack,
  CircularProgress,
} from '@mui/material'
import {alpha, visuallyHidden} from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import Card from './Card'
import Popper from './Popper'
import TextField from './TextField'

/**
 * @typedef {{ id: string, [key:string]: any }} Row
 * @typedef {{ id: string, label: string, numeric?: boolean, disablePadding?: boolean, withActions?: boolean }} HeadCell
 * @typedef {{ name: string, method: (ids: string[]) => void }} TableAction
 * @typedef {{ id: string, name: string, onFilter: () => void }} FilterItem
 * @typedef {{ id: string, name: string, items: FilterItem[] }} FilterGroup
 */

/**
 * @param {Object} props
 * @param {string} [props.title]
 * @param {HeadCell[]} props.headCells
 * @param {Row[]} props.rows
 * @param {number} props.totalRows
 * @param {TableAction[]} [props.actions]
 * @param {FilterGroup[]} [props.filters]
 * @param {{root:string, create:string}} props.hrefs
 * @param {(q:string)=>Promise<void>|void} props.onSearch
 * @param {(page:number, perPage:number)=>Promise<void>|void} props.onPageChange
 * @param {(perPage:number)=>Promise<void>|void} props.onRowsPerPageChange
 * @param {(id:string)=>void} [props.onRowDelete]
 * @param {boolean} [props.loading]
 */
export default function Table({
  title = '',
  headCells,
  rows,
  totalRows,
  actions = [],
  filters = [],
  hrefs,
  onSearch,
  onPageChange,
  onRowsPerPageChange,
  onRowDelete,
  loading = false,
  avatarKey = 'image',
}) {
  const [order, setOrder] = useState('asc') // 'asc' | 'desc'
  const [orderBy, setOrderBy] = useState(headCells[0]?.id ?? 'id')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchLoading, setSearchLoading] = useState(false)
  const [filterOpen, setFilterOpen] = useState({})
  const searchTimeout = useRef(null)

  const comparator = useCallback(
    (a, b) => {
      const av = a[orderBy]
      const bv = b[orderBy]
      if (av < bv) return order === 'asc' ? -1 : 1
      if (av > bv) return order === 'asc' ? 1 : -1
      return 0
    },
    [order, orderBy]
  )

  const visibleRows = useMemo(
    () => rows.slice().sort(comparator),
    [rows, comparator]
  )

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const toggleAll = (checked) => {
    setSelected(checked ? rows.map((r) => r.id) : [])
  }

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleChangePage = async (_, newPage) => {
    setPage(newPage)
    await onPageChange(newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = async (e) => {
    const value = parseInt(e.target.value, 10)
    setRowsPerPage(value)
    setPage(0)
    await onRowsPerPageChange(value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRows) : 0

  const debouncedSearch = (val) => {
    setSearchLoading(true)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      await onSearch(val)
      setSearchLoading(false)
    }, 300)
  }

  const handleFilterClick = (id) => {
    setFilterOpen((p) => ({...p, [id]: !p[id]}))
  }

  useEffect(() => {
    setSelected((prev) => {
      const alive = new Set(rows.map((r) => String(r.id)))
      return prev.filter((id) => alive.has(String(id)))
    })
  }, [rows])

  return (
    <Box sx={{width: '100%'}}>
      {loading && <LinearProgress />}
      <Card sx={{p: 0}}>
        {/* Toolbar */}
        <Toolbar sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1}}}>
          <Box sx={{flex: 1, display: 'flex', alignItems: 'center'}}>
            <Typography
              variant="h6"
              sx={{mr: 2}}
            >
              {title}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{mr: 1}}
              component={Link}
              href={hrefs.root + hrefs.create}
            >
              Add New
            </Button>

            {/* Actions */}
            <Popper
              keepOpen
              elId="actions"
              title={
                <Button
                  variant={selected.length ? 'contained' : 'outlined'}
                  size="small"
                  sx={{mr: 1}}
                  disabled={!selected.length}
                >
                  Actions ({selected.length})
                  <KeyboardArrowDownIcon />
                </Button>
              }
            >
              <List
                dense
                sx={{width: 180}}
              >
                {actions.map((a) => (
                  <ListItemButton
                    key={a.name}
                    sx={{
                      borderRadius: 1,
                      '&:hover': {bgcolor: alpha('#000', 0.08)},
                    }}
                    onClick={() => a.method(selected)}
                  >
                    <ListItemText primary={a.name} />
                  </ListItemButton>
                ))}
              </List>
            </Popper>

            {/* Filters */}
            <Popper
              keepOpen
              elId="filters"
              title={
                <Button
                  variant="outlined"
                  size="small"
                  sx={{mr: 1}}
                >
                  Filters
                  <KeyboardArrowDownIcon />
                </Button>
              }
            >
              <List
                dense
                sx={{width: 220}}
              >
                {filters.map((group) => (
                  <Fragment key={group.id}>
                    <ListItemButton
                      onClick={() => handleFilterClick(group.id)}
                      sx={{
                        borderRadius: 1,
                        '&:hover': {bgcolor: alpha('#000', 0.08)},
                      }}
                      aria-controls={`filter-${group.id}`}
                      aria-expanded={filterOpen[group.id] || false}
                    >
                      <ListItemText primary={group.name} />
                      {filterOpen[group.id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={filterOpen[group.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        dense
                        disablePadding
                        id={`filter-${group.id}`}
                        sx={{bgcolor: alpha('#000', 0.03)}}
                      >
                        {group.items.map((item) => (
                          <ListItemButton
                            key={item.id}
                            onClick={item.onFilter}
                          >
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Fragment>
                ))}
              </List>
            </Popper>
          </Box>

          <TextField
            label="Search in table"
            onChange={(e) => debouncedSearch(e.target.value)}
            InputProps={{
              endAdornment: searchLoading && <CircularProgress size={20} />,
            }}
            sx={{width: 320}}
          />
        </Toolbar>

        {/* Table */}
        <TableContainer>
          <MuiTable
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
          >
            <TableHead sx={{bgcolor: alpha('#000', 0.03)}}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      !!selected.length && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(e) => toggleAll(e.target.checked)}
                    slotProps={{input: {'aria-label': 'select all'}}}
                  />
                </TableCell>
                {headCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    padding={cell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === cell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, cell.id)}
                    >
                      {cell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.length ? (
                visibleRows.map((row) => {
                  const isItemSelected = selected.includes(row.id)
                  return (
                    <TableRow
                      key={row.id}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => toggleOne(row.id)}
                          slotProps={{input: {id: `row-${row.id}`}}}
                        />
                      </TableCell>

                      {headCells.map((cell) => (
                        <Fragment key={cell.id}>
                          {cell.withActions ? (
                            <TableCell
                              component="th"
                              id={`row-${row.id}`}
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                {avatarKey in row && row[avatarKey] && (
                                  <Avatar
                                    src={
                                      typeof row[avatarKey] === 'object'
                                        ? row[avatarKey].src ||
                                          row[avatarKey].url
                                        : row[avatarKey]
                                    }
                                    sx={{p: 0.3}}
                                    variant="rounded"
                                  />
                                )}

                                <Box>
                                  <Typography variant="body2">
                                    {row[cell.id]}
                                  </Typography>
                                  <Box>
                                    <Typography
                                      component={Link}
                                      href={`${hrefs.root}/${row.id}`}
                                      variant="caption"
                                      sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                          textDecoration: 'underline',
                                        },
                                      }}
                                    >
                                      View or Edit: {row.id} |{' '}
                                    </Typography>
                                    {onRowDelete && (
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: 'primary.main',
                                          cursor: 'pointer',
                                          '&:hover': {
                                            textDecoration: 'underline',
                                          },
                                        }}
                                        onClick={() => onRowDelete(row.id)}
                                      >
                                        Delete
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </Stack>
                            </TableCell>
                          ) : (
                            <TableCell>{row[cell.id]}</TableCell>
                          )}
                        </Fragment>
                      ))}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headCells.length + 1}
                    sx={{textAlign: 'center'}}
                  >
                    No records found
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  )
}
