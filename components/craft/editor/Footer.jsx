'use client'

import {Editor as CraftEditor} from '@craftjs/core'
import RootContainer from '../nodes/global/RootContainer'
import Container from '../nodes/global/Container'
import Flexbox from '../nodes/global/Flexbox'
import Grid from '../nodes/global/Grid'
import GridColumn from '../nodes/global/GridColumn'
import Title from '../nodes/global/Title'
import Image from '../nodes/global/Image'
import {Box} from '@mui/material'
import ViewportFooter from '../viewport/Footer'
import Toolbox from '../toolbox'

export default function Editor() {
  return (
    <CraftEditor
      resolver={{
        RootContainer,
        Container,
        Flexbox,
        Grid,
        GridColumn,
        Title,
        Image,
      }}
    >
      <Box sx={{display: 'flex'}}>
        <Toolbox type="footer" />

        <ViewportFooter />
      </Box>
    </CraftEditor>
  )
}
