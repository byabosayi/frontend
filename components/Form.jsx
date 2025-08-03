'use client'

import FormFields from './FormFields'
import {useFormik} from 'formik'
import {getInitialValuesFromFields, getValidationSchema} from '@/utils/form'
import {memo} from 'react'
import {Button, CircularProgress, Typography} from '@mui/material'

export default memo(function Form({
  defaultValues,
  fields,
  onSubmit,
  title,
  submitBtnTitle = 'Submit',
  fullWidthSubmitBtn = true,
  allSelectItems = null,
  allAutocompleteItems = null,
  autocompleteLoading = false,
  justifyContent = 'center',
  submitBtnWidth = '100%',
  children,
}) {
  const initialValues = defaultValues
    ? defaultValues
    : getInitialValuesFromFields(fields)

  const validationSchema = getValidationSchema(fields)

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      {title && (
        <Typography
          variant="h5"
          sx={{textAlign: 'center', mb: 4, fontWeight: 'medium'}}
        >
          {title}
        </Typography>
      )}

      <FormFields
        justifyContent={justifyContent}
        fields={fields}
        values={values}
        allSelectItems={allSelectItems}
        allAutocompleteItems={allAutocompleteItems}
        autocompleteLoading={autocompleteLoading}
        touched={touched}
        errors={errors}
        onChange={handleChange}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
      />

      {typeof children === 'function'
        ? children({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          })
        : children}

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        fullWidth={fullWidthSubmitBtn}
        sx={{
          display: 'flex',
          mx: 'auto',
          width: submitBtnWidth,
        }}
      >
        {!isSubmitting ? (
          submitBtnTitle
        ) : (
          <CircularProgress
            size={24}
            sx={{
              color: 'primary',
            }}
          />
        )}
      </Button>
    </form>
  )
})
