import * as yup from 'yup'

const createYupSchema = (schema, config) => {
  const {
    id,
    type: fieldType,
    strongValidation,
    confirmPassword,
    validations = [],
  } = config

  let firstValidationType = 'mixed'

  if (fieldType === 'email') {
    firstValidationType = 'string'
  } else if (fieldType === 'number') {
    firstValidationType = 'number'
  } else if (fieldType === 'date') {
    firstValidationType = 'date'
  }

  if (!yup[firstValidationType]) {
    return schema
  }

  if (fieldType === 'email') {
    validations.push({
      type: 'matches',
      params: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
        'Please enter a valid email',
      ],
    })
  }

  if (fieldType === 'password' && strongValidation) {
    validations.push({
      type: 'matches',
      params: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`'"()\[\]{}|\-\+,;:<>?=^_\\./!@#\$%\^&\*]).{6,}$/,
        'At least 1 uppercase, 1 lowercase, 1 number and 1 special symble',
      ],
    })
  }

  if (confirmPassword) {
    validations.push({
      type: 'oneOf',
      params: [[yup.ref(confirmPassword), null], 'Passwords must match'],
    })
  }

  let validator = yup[firstValidationType]()
  validations.forEach((validation) => {
    const {params, type} = validation
    if (!validator[type]) {
      return
    }

    validator = validator[type](...params)
  })

  schema[id] = validator
  return schema
}

export const getValidationSchema = (fields) => {
  const yepSchema = fields.reduce(createYupSchema, {})
  const validationSchema = yup.object().shape(yepSchema)
  return validationSchema
}

export const getInitialValuesFromFields = (fields) => {
  let emptyValues = {}
  fields.map((field) => {
    emptyValues[field.id] = field.defaultValue
      ? field.defaultValue
      : field.type === 'number'
      ? 0
      : ''
  })

  return emptyValues
}
