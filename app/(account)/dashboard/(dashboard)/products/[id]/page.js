'use client'

import Form from '@/components/Form'
import api from '@/libs/axios'
import {setSnackbar} from '@/libs/redux/slices/global'
import {useParams, useRouter} from 'next/navigation'
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
    id: 'slug',
    label: 'Slug',
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
    id: 'regular_price',
    label: 'Regular price',
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
    id: 'sku',
    label: 'SKU',
    type: 'text',
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
const defaultValues = {
  thumbnail: {
    id: 3,
    user_id: 3,
    name: 'screenshot-73-1753780464.png',
    path: 'users/3/screenshot-73-1753780464.png',
    url: 'http://localhost:8000/storage/users/3/screenshot-73-1753780464.png',
    type: 'image/png',
    size: 272,
    width: null,
    height: null,
    purpose: null,
    disk: 'public',
    fileable_type: null,
    fileable_id: null,
    created_at: '29-07-2025 09:14 AM',
    formatted: {
      size: '272 KB',
    },
  },
  images: [
    {
      id: 3,
      user_id: 3,
      name: 'screenshot-73-1753780464.png',
      path: 'users/3/screenshot-73-1753780464.png',
      url: 'http://localhost:8000/storage/users/3/screenshot-73-1753780464.png',
      type: 'image/png',
      size: 272,
      width: null,
      height: null,
      purpose: null,
      disk: 'public',
      fileable_type: null,
      fileable_id: null,
      created_at: '29-07-2025 09:14 AM',
      formatted: {
        size: '272 KB',
      },
    },
    {
      id: 2,
      user_id: 3,
      name: 'chatgpt-image-may-17-2025-09-30-34-pm-1752856099.png',
      path: 'users/3/chatgpt-image-may-17-2025-09-30-34-pm-1752856099.png',
      url: 'http://localhost:8000/storage/users/3/chatgpt-image-may-17-2025-09-30-34-pm-1752856099.png',
      type: 'image/png',
      size: 3127,
      width: null,
      height: null,
      purpose: null,
      disk: 'public',
      fileable_type: null,
      fileable_id: null,
      created_at: '18-07-2025 04:28 PM',
      formatted: {
        size: '3.05 MB',
      },
    },
  ],
  name: 'Product 1',
  short_description: '<h1>Short description</h1>',
  long_description: '<h3>Long description</h3>',
  status: 'public',
  regular_price: 1000,
  sale_price: 1000,
  slug: 'product-1',
  stock: 100,
  sku: 'sku-DFFDU21',
  categories: [2],
  attributes: [3, 4],
}

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
  const params = useParams()
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
    <>
      <h1>
        first fetch product by id, if not found show not found page, otherwise
        show form with value: {params.id}
      </h1>

      <Form
        submitBtnTitle="Add New Product"
        fields={formInputFields}
        defaultValues={defaultValues}
        allAutocompleteItems={allAutocompleteItems}
        onSubmit={submit}
      />
    </>
  )
}
