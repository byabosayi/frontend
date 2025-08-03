'use client'
import {Box} from '@mui/material'
import {Element, useEditor} from '@craftjs/core'
import SelectedSettings from './SelectedSettings'
import Elements from './Elements'
import Flexbox from '../../nodes/global/Flexbox'
import Container from '../../nodes/global/Container'
import Grid from '../../nodes/global/Grid'
import GridColumn from '../../nodes/global/GridColumn'
import Title from '../../nodes/global/Title'
import Image from '../../nodes/global/Image'

const elements = {
  page: [
    {
      groupName: 'General',
      items: [
        {
          name: 'Flexbox',
          component: (
            <Element
              is={Flexbox}
              canvas
            />
          ),
        },
        {
          name: 'Container',
          component: (
            <Element
              is={Container}
              canvas
            />
          ),
        },
        {
          name: 'Grid',
          component: (
            <Element
              is={Grid}
              canvas
            />
          ),
        },
        {
          name: 'Grid Column',
          component: (
            <Element
              is={GridColumn}
              canvas
            />
          ),
        },
        {
          name: 'Title',
          component: <Title />,
        },
        {
          name: 'Image',
          component: <Image />,
        },
      ],
    },
    {
      groupName: 'Product',
      items: [
        {
          name: 'Product List',
          // component: <ProductList />,
        },
      ],
    },
    {
      groupName: 'Pages',
      items: [
        {
          name: 'Products Page',
          // component: (
          //   <Element
          //     is={ProductsPage}
          //     canvas
          //   />
          // ),
        },
      ],
    },
  ],
  header: [
    {
      groupName: 'General',
      items: [
        {
          name: 'Flexbox',
          component: (
            <Element
              is={Flexbox}
              canvas
            />
          ),
        },
        {
          name: 'Container',
          component: (
            <Element
              is={Container}
              canvas
            />
          ),
        },
        {
          name: 'Grid',
          component: (
            <Element
              is={Grid}
              canvas
            />
          ),
        },
        {
          name: 'Grid Column',
          component: (
            <Element
              is={GridColumn}
              canvas
            />
          ),
        },
        {
          name: 'Title',
          component: <Title />,
        },
        {
          name: 'Image',
          component: <Image />,
        },
        // {
        //   name: 'Primary Header',
        //   component: <PrimaryHeader />,
        // },
        // {
        //   name: 'Secondary Header',
        //   component: <SecondaryHeader />,
        // },
      ],
    },
  ],
  footer: [
    {
      groupName: 'General',
      items: [
        {
          name: 'Flexbox',
          component: (
            <Element
              is={Flexbox}
              canvas
            />
          ),
        },
        {
          name: 'Container',
          component: (
            <Element
              is={Container}
              canvas
            />
          ),
        },
        {
          name: 'Grid',
          component: (
            <Element
              is={Grid}
              canvas
            />
          ),
        },
        {
          name: 'Grid Column',
          component: (
            <Element
              is={GridColumn}
              canvas
            />
          ),
        },
        {
          name: 'Title',
          component: <Title />,
        },
        {
          name: 'Image',
          component: <Image />,
        },
        // {
        //   name: 'Footer',
        //   component: <Footer />,
        // },
      ],
    },
  ],
}

export default function Toolmiddle({type}) {
  const {hasSelectedNode} = useEditor((state) => {
    const [currentNodeId] = state.events.selected
    return {
      hasSelectedNode: currentNodeId ? true : false,
    }
  })

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        p: 1,

        // Scrollbar width
        // '&::-webkit-scrollbar': {
        //   width: '0.3em',
        // },
        // '&::-webkit-scrollbar-track': {
        //   backgroundColor: 'transparent',
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'grey',
        //   borderRadius: '3px',
        // },

        /* hide scrollbar everywhere */
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {display: 'none'}, // Chrome/Safari/Edge
      }}
    >
      {hasSelectedNode ? (
        <SelectedSettings />
      ) : (
        <Elements nodes={elements[type]} />
      )}
    </Box>
  )
}
