import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
  Typography,
} from '@mui/material'

export default function Radio({
  value,
  defaultValue = null,
  id,
  name,
  label,
  size = 'small',
  variant = 'filled',
  helperText,
  type,
  required,
  disabled,
  errorText,
  touched,
  items,
  itemLabel,
  itemValue,
  onChange,
  onBlur,
  sx,
  ...restProps
}) {
  return (
    <FormControl
      sx={{
        width: '100%',
        ...sx,
      }}
      variant={variant}
      size={size}
      error={errorText && touched}
      required={required}
    >
      <FormLabel
        id={id ? id : name}
        sx={{color: 'text.primary'}}
      >
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby={id ? id : name}
        row
        name={name}
        // defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<MuiRadio size="small" />}
            label={item.label}
          />
        ))}
      </RadioGroup>

      {errorText && touched ? (
        <Typography
          variant="caption"
          sx={{pl: 2, color: 'error.main'}}
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
}
