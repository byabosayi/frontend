import {TextField as MuiTextField} from '@mui/material'

export default function TextField({
  value,
  name,
  variant = 'filled',
  label,
  size = 'small',
  helperText,
  textarea,
  required,
  disabled,
  errorText,
  touched,
  onChange,
  onBlur,
  sx,
  borderRadius = 1,
  ...props
}) {
  return (
    <MuiTextField
      variant={variant}
      label={label}
      size={size}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required ? required : false}
      error={errorText && touched ? true : false}
      fullWidth
      disabled={disabled}
      multiline={textarea ? true : false}
      maxRows={textarea ? 3 : 1}
      sx={{
        // '.MuiFormHelperText-root': {
        // color: errorText ? 'red' : 'text.primary',
        // },
        '.MuiInputBase-root:before': {
          borderBottom: 'none !important',
        },
        '.MuiInputBase-root': {
          borderRadius,
        },
        '.MuiInputBase-root:after': {
          borderBottom: 'none !important',
        },
        '.MuiFormLabel-root': {
          color: 'text.primary',
        },
        ...sx,
      }}
      helperText={errorText && touched ? errorText : helperText}
      {...props}
    />
  )
}
