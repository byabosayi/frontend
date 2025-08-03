'use client'

import {useState, useMemo} from 'react'
import {Box, TextField, Autocomplete, Stack} from '@mui/material'
// import {divisions, districts, upazilas, unions} from '@/lib/bdAddress'
import json from '@/json/address'

// const countries = json.countries
const divisions = json.divisions
const districts = json.districts
const upazilas = json.upazilas
const unions = json.unions

export default function BdAddressForm({
  lang = 'en', // 'en' or 'bn'
  prefix = '', // e.g. 'shipping' to match your backend keys
  defaultValues = {}, // pre-fill (IDs)
  onChange, // callback(allSelectedObject)
}) {
  const [division, setDivision] = useState(
    divisions.find((d) => d.id === defaultValues[`${prefix}state`]) || null
  )
  const [district, setDistrict] = useState(
    districts.find((d) => d.id === defaultValues[`${prefix}county`]) || null
  )
  const [upazila, setUpazila] = useState(
    upazilas.find((u) => u.id === defaultValues[`${prefix}city`]) || null
  )
  const [union, setUnion] = useState(
    unions.find((u) => u.id === defaultValues[`${prefix}neighborhood`]) || null
  )
  const [street, setStreet] = useState(defaultValues[`${prefix}street`] || '')
  const [postcode, setPostcode] = useState(
    defaultValues[`${prefix}postcode`] || ''
  )

  // Filtered lists
  const filteredDistricts = useMemo(
    () => districts.filter((d) => d.division_id === division?.id),
    [division]
  )
  const filteredUpazilas = useMemo(
    () => upazilas.filter((u) => u.district_id === district?.id),
    [district]
  )
  const filteredUnions = useMemo(
    () => unions.filter((u) => u.upazilla_id === upazila?.id),
    [upazila]
  )

  const labelKey = lang === 'bn' ? 'bn_name' : 'name'

  const emitChange = (next = {}) => {
    const payload = {
      [`${prefix}country`]: 14, // BD fixed
      [`${prefix}state`]: division?.id || null,
      [`${prefix}county`]: district?.id || null,
      [`${prefix}city`]: upazila?.id || null,
      [`${prefix}neighborhood`]: union?.id || null,
      [`${prefix}street`]: street,
      [`${prefix}postcode`]: postcode,
      ...next,
    }
    onChange && onChange(payload)
  }

  // Update cascade + notify parent
  const handleDivision = (_, val) => {
    setDivision(val)
    setDistrict(null)
    setUpazila(null)
    setUnion(null)
    emitChange({
      [`${prefix}state`]: val?.id || null,
      [`${prefix}county`]: null,
      [`${prefix}city`]: null,
      [`${prefix}neighborhood`]: null,
    })
  }
  const handleDistrict = (_, val) => {
    setDistrict(val)
    setUpazila(null)
    setUnion(null)
    emitChange({
      [`${prefix}county`]: val?.id || null,
      [`${prefix}city`]: null,
      [`${prefix}neighborhood`]: null,
    })
  }
  const handleUpazila = (_, val) => {
    setUpazila(val)
    setUnion(null)
    emitChange({
      [`${prefix}city`]: val?.id || null,
      [`${prefix}neighborhood`]: null,
    })
  }
  const handleUnion = (_, val) => {
    setUnion(val)
    emitChange({[`${prefix}neighborhood`]: val?.id || null})
  }

  return (
    <Stack spacing={2}>
      {/* Division / State */}
      <Autocomplete
        options={divisions}
        value={division}
        getOptionLabel={(o) => o?.[labelKey] || ''}
        onChange={handleDivision}
        renderInput={(params) => (
          <TextField
            {...params}
            label={lang === 'bn' ? 'বিভাগ' : 'State / Division'}
            fullWidth
            variant="filled"
            size="small"
            sx={{
              '.MuiInputBase-root:before': {
                borderBottom: 'none !important',
              },
              '.MuiInputBase-root': {
                borderRadius: 1,
              },
              '.MuiInputBase-root:after': {
                borderBottom: 'none !important',
              },
            }}
          />
        )}
      />

      {/* District / County */}
      <Autocomplete
        options={filteredDistricts}
        value={district}
        getOptionLabel={(o) => o?.[labelKey] || ''}
        onChange={handleDistrict}
        disabled={!division}
        renderInput={(params) => (
          <TextField
            {...params}
            label={lang === 'bn' ? 'জেলা' : 'District / County'}
            variant="filled"
            size="small"
            sx={{
              '.MuiInputBase-root:before': {
                borderBottom: 'none !important',
              },
              '.MuiInputBase-root': {
                borderRadius: 1,
              },
              '.MuiInputBase-root:after': {
                borderBottom: 'none !important',
              },
            }}
          />
        )}
      />

      {/* Upazila / City */}
      <Autocomplete
        size="small"
        options={filteredUpazilas}
        value={upazila}
        getOptionLabel={(o) => o?.[labelKey] || ''}
        onChange={handleUpazila}
        disabled={!district}
        renderInput={(params) => (
          <TextField
            {...params}
            label={lang === 'bn' ? 'উপজেলা' : 'Upazila / City'}
            variant="filled"
            size="small"
            sx={{
              '.MuiInputBase-root:before': {
                borderBottom: 'none !important',
              },
              '.MuiInputBase-root': {
                borderRadius: 1,
              },
              '.MuiInputBase-root:after': {
                borderBottom: 'none !important',
              },
            }}
          />
        )}
      />

      {/* Union / Neighborhood */}
      <Autocomplete
        size="small"
        options={filteredUnions}
        value={union}
        getOptionLabel={(o) => o?.[labelKey] || ''}
        onChange={handleUnion}
        disabled={!upazila}
        renderInput={(params) => (
          <TextField
            {...params}
            label={lang === 'bn' ? 'ইউনিয়ন' : 'Union / Neighborhood'}
            variant="filled"
            size="small"
            sx={{
              '.MuiInputBase-root:before': {
                borderBottom: 'none !important',
              },
              '.MuiInputBase-root': {
                borderRadius: 1,
              },
              '.MuiInputBase-root:after': {
                borderBottom: 'none !important',
              },
            }}
          />
        )}
      />

      {/* Street & Postcode */}
      <TextField
        label={lang === 'bn' ? 'রাস্তা/এলাকা' : 'Street'}
        variant="filled"
        size="small"
        sx={{
          '.MuiInputBase-root:before': {
            borderBottom: 'none !important',
          },
          '.MuiInputBase-root': {
            borderRadius: 1,
          },
          '.MuiInputBase-root:after': {
            borderBottom: 'none !important',
          },
        }}
        value={street}
        onChange={(e) => {
          setStreet(e.target.value)
          emitChange({[`${prefix}street`]: e.target.value})
        }}
      />
      <TextField
        label={lang === 'bn' ? 'পোস্ট কোড' : 'Postcode'}
        variant="filled"
        size="small"
        sx={{
          '.MuiInputBase-root:before': {
            borderBottom: 'none !important',
          },
          '.MuiInputBase-root': {
            borderRadius: 1,
          },
          '.MuiInputBase-root:after': {
            borderBottom: 'none !important',
          },
        }}
        value={postcode}
        onChange={(e) => {
          setPostcode(e.target.value)
          emitChange({[`${prefix}postcode`]: e.target.value})
        }}
      />
    </Stack>
  )
}
