'use client'

import Form from '@/components/Form'
import api from '@/libs/axios'
import {setSnackbar} from '@/libs/redux/slices/global'
import {useRouter} from 'next/navigation'
import {useDispatch} from 'react-redux'

const formInputFields = [
  {
    id: 'thumbnail',
    label: 'Thumbnail',
    type: 'file',
    columnXs: 12,
    columnMd: 6,
    columnLg: 4,
  },
  {
    id: 'images',
    label: 'Gallery Images',
    type: 'file',
    columnXs: 12,
    columnMd: 6,
    columnLg: 8,
    multiple: true,
  },
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
  },
  {
    id: 'short_description',
    label: 'Short description',
    type: 'text-editor',
  },
  {
    id: 'long_description',
    label: 'Long description',
    type: 'text-editor',
  },
  {
    id: 'status',
    label: 'Status',
    type: 'radio',
    defaultValue: 'public',
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
    items: [
      {
        value: 'draft',
        label: 'Draft',
      },
      {
        value: 'public',
        label: 'Public',
      },
      {
        value: 'private',
        label: 'Private',
      },
    ],
  },
  {
    id: 'stock',
    label: 'Stock',
    type: 'number',
    columnXs: 12,
    columnMd: 6,
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
  },
  {
    id: 'sale_price',
    label: 'Sale price',
    type: 'number',
    columnXs: 12,
    columnMd: 6,
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
  },
  {
    id: 'categories',
    label: 'Categories',
    type: 'autocomplete',
    columnXs: 12,
    columnMd: 6,
  },
  {
    id: 'attributes',
    label: 'Attributes',
    type: 'autocomplete',
    columnXs: 12,
    columnMd: 6,
  },
]

// Fetch with api
const allAutocompleteItems = {
  categories: [
    {label: 'Category 1', value: 1},
    {label: 'Category 2', value: 2},
  ],
  attributes: [
    {label: 'Red', value: 1, group: 'Color'},
    {label: 'Green', value: 2, group: 'Color'},
    {label: 'Blue', value: 3, group: 'Color'},
    {label: 'Small', value: 4, group: 'Size'},
    {label: 'Medium', value: 5, group: 'Size'},
    {label: 'Large', value: 6, group: 'Size'},
  ],
}

export default function Page() {
  const dispatch = useDispatch()
  const router = useRouter()

  const submit = async (values, actions) => {
    dispatch(setSnackbar({open: false}))

    try {
      await api
        .post('retailer/products', values)
        .then((res) => {
          router.push('/dashboard/products/' + res.data?.data?.id)
        })
        .catch((err) => {
          dispatch(
            setSnackbar({
              open: true,
              message: err?.response?.data?.message?.[locale],
              severity: 'error',
            })
          )
        })
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          severity: 'error',
        })
      )
    }

    actions.setSubmitting(false)
  }

  return (
    <Form
      submitBtnTitle="Add New Product"
      fields={formInputFields}
      allAutocompleteItems={allAutocompleteItems}
      onSubmit={submit}
    />
    //   {({setFieldValue, values}) => <MediaTest />}
    // </Form>
  )
}
