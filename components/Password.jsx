'use client'

import {Visibility, VisibilityOff} from '@mui/icons-material'
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'
import {memo, useState} from 'react'

export default memo(function Password({
  value,
  name,
  label,
  helperText,
  type,
  required,
  disabled,
  errorText,
  touched,
  onChange,
  onBlur,
  borderRadius = 1,
  sx,
  ...restProps
}) {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <FormControl
      sx={{width: '100%', ...sx}}
      variant="filled"
      size="small"
      error={errorText && touched ? true : false}
      required={required ? required : false}
      {...restProps}
    >
      <InputLabel
        htmlFor={name}
        sx={{color: 'text.primary'}}
      >
        {label}
      </InputLabel>
      <FilledInput
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{borderRadius: borderRadius}}
        disableUnderline
        id={name}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errorText && touched ? (
        <Typography
          variant="caption"
          color="error"
          sx={{pl: 2}}
        >
          {errorText}
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{pl: 2}}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  )
})
