import TableApi from '@/components/TableApi'

const headCells = [
  {id: 'name', label: 'Name', disablePadding: true, withActions: true},
  {id: 'sku', label: 'SKU'},
  {id: 'price', label: 'Price', numeric: true},
  {id: 'status', label: 'Status'},
  {id: 'stock', label: 'Stock', numeric: true},
]

export default function Page() {
  return (
    <TableApi
      title="Products"
      headCells={headCells}
      endpoint="/retailer/products"
      baseParams={{user_id: 3}}
      actions={[
        {name: 'Delete', method: 'DELETE', isDelete: true},
        {name: 'Publish', method: 'PUT', body: {status: 'publish'}},
      ]}
      filters={[
        {
          id: 'status',
          name: 'By status',
          items: [
            {id: 'public', name: 'Public', params: {status: 'public'}},
            {id: 'private', name: 'Private', params: {status: 'private'}},
            {id: 'draft', name: 'Draft', params: {status: 'draft'}},
          ],
        },
      ]}
      hrefs={{root: '/dashboard/products', create: '/add-new'}}
      avatarKey="thumbnail"
    />
  )
}
