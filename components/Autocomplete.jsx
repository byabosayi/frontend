import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import MuiAutocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {Chip, CircularProgress} from '@mui/material'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function Autocomplete({
  value = [],
  id,
  name,
  label,
  helperText,
  type,
  borderRadius = 1,
  required,
  disabled,
  errorText,
  touched,
  items = [],
  loading = false,
  onChange,
  onBlur,
  sx,
  ...restProps
}) {
  // Map the value array to the corresponding item objects
  // const selectedItems = items.filter((item) => value.includes(item.value))

  // Safely filter items based on value
  const selectedItems = items.filter((item) =>
    Array.isArray(value) ? value.includes(item.value) : false
  )

  return (
    <MuiAutocomplete
      multiple
      options={items}
      groupBy={(option) => option.group}
      disableCloseOnSelect
      renderOption={(props, option, {selected}) => {
        const {key, ...rest} = props
        return (
          <li
            key={key}
            {...rest}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{marginRight: 2}}
              checked={selected}
            />
            {option.label}
          </li>
        )
      }}
      // renderTags={(value, getTagProps) =>
      //   value.map((option, index) => {
      //     const {key, ...tagProps} = getTagProps({index})
      //     return (
      //       <Chip
      //         size="small"
      //         label={option.label}
      //         key={key}
      //         {...tagProps}
      //       />
      //     )
      //   })
      // }
      renderValue={(selected) =>
        selected.map((option) => {
          return (
            <Chip
              key={option.value}
              size="small"
              label={option.label}
            />
          )
        })
      }
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          variant="filled"
          size="small"
          sx={{
            '.MuiInputBase-root:before': {
              borderBottom: 'none !important',
            },
            '.MuiInputBase-root': {
              borderRadius: borderRadius,
            },
            '.MuiInputBase-root:after': {
              borderBottom: 'none !important',
            },
            ...sx,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          // slotProps={{
          //   input: {
          //     ...params.inputProps,
          //     endAdornment: (
          //       <>
          //         {loading ? (
          //           <CircularProgress
          //             color="inherit"
          //             size={20}
          //           />
          //         ) : null}
          //         {params.inputProps.endAdornment}
          //       </>
          //     ),
          //   },
          // }}
          required={required ? required : false}
          error={errorText && touched ? true : false}
          helperText={errorText && touched ? errorText : helperText}
          {...restProps}
        />
      )}
      value={selectedItems}
      onChange={(e, v) => {
        // Map the selected item objects to their value properties
        const selectedValues = v.map((item) => item.value)
        onChange({
          target: {
            name,
            value: selectedValues,
          },
        })
      }}
      onBlur={onBlur}
    />
  )
}
