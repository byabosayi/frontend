import {Grid} from '@mui/material'
import dynamic from 'next/dynamic'
import {memo} from 'react'

const TextField = dynamic(() => import('./TextField'))
const Password = dynamic(() => import('./Password'))
const Autocomplete = dynamic(() => import('./Autocomplete'))
const TextEditor = dynamic(() => import('./TextEditor'))
const Radio = dynamic(() => import('./Radio'))
const File = dynamic(() => import('./File'))

export default memo(function FormFields({
  fields,
  values,
  touched,
  errors,
  onChange,
  onBlur,
  setFieldValue,
  allSelectItems = null,
  allAutocompleteItems = null,
  autocompleteLoading = false,
  justifyContent = 'center',
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{pb: 2}}
      justifyContent={justifyContent}
    >
      {fields.map((field) => (
        <Grid
          size={{
            xs: field.columnXs || 12,
            md: field.columnMd || undefined,
            lg: field.columnLg || undefined,
            xl: field.columnXl || undefined,
            xxl: field.columnXxl || undefined,
          }}
          key={field.id}
        >
          <>
            {field.type !== 'text' || (
              <TextField
                name={field.id}
                value={values[field.id]}
                label={field.label}
                textarea={field.textarea ? field.textarea : false}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
                sx={{
                  mr: {md: 2},
                }}
              />
            )}

            {field.type !== 'text-editor' || (
              <TextEditor
                name={field.id}
                value={values[field.id]}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}

            {field.type !== 'select' || (
              <BaseSelect
                name={field.id}
                value={values[field.id]}
                items={
                  allSelectItems && allSelectItems[field.id].length > 0
                    ? allSelectItems[field.id]
                    : field.items
                }
                loading={autocompleteLoading}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
                sx={{
                  mr: {md: 2},
                }}
              />
            )}

            {field.type !== 'autocomplete' || (
              <Autocomplete
                name={field.id}
                value={values[field.id]}
                items={
                  allAutocompleteItems &&
                  allAutocompleteItems[field.id].length > 0
                    ? allAutocompleteItems[field.id]
                    : field.items
                }
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
                sx={{
                  mr: {md: 2},
                }}
              />
            )}

            {field.type !== 'email' || (
              <TextField
                name={field.id}
                value={values[field.id]}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
                sx={{
                  mr: {md: 2},
                }}
              />
            )}

            {field.type !== 'number' || (
              <TextField
                name={field.id}
                value={values[field.id]}
                type="number"
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}

            {field.type !== 'password' || (
              <Password
                name={field.id}
                value={values[field.id]}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}

            {field.type !== 'file' || (
              <File
                name={field.id}
                label={field.label}
                value={values[field.id]}
                multiple={field.multiple ? true : false}
                helperText={field.helperText}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                imageOnly={field.imageOnly ? true : false}
                onChange={(e) => {
                  onChange({
                    target: {
                      name: field.id,
                      value: e,
                    },
                  })
                }}
              />
            )}

            {/* {field.type !== 'region' || (
              <BaseRegion
                value={values[field.id]}
                name={field.id}
                validations={field.validations}
                country={values.country}
                state={values.state}
                isState={field.isState ? true : false}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onBlur={onBlur}
                setFieldValue={setFieldValue}
              />
            )} */}

            {/* {field.type !== 'phone' || (
              <BasePhoneInput
                name={field.id}
                value={values[[field.id]]}
                required={field.required}
                disabled={field.disabled ? true : false}
                setFieldValue={setFieldValue}
              />
            )} */}

            {field.type !== 'radio' || (
              <Radio
                name={field.id}
                items={field.items}
                value={values[field.id]}
                defaultValue={field.defaultValue}
                label={field.label}
                helperText={field.helperText}
                required={field.required}
                disabled={field.disabled ? true : false}
                touched={touched[field.id]}
                errorText={errors[field.id]}
                onChange={onChange}
                onBlur={onBlur}
                sx={{
                  mr: {md: 2},
                }}
              />
            )}
          </>
        </Grid>
      ))}
    </Grid>
  )
})
