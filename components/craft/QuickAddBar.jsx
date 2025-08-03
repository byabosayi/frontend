'use client'

import {Element, ROOT_NODE, useEditor} from '@craftjs/core'
import {
  Paper,
  Button,
  Dialog,
  Slider,
  Card,
  Box,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {useState} from 'react'
import Container from './nodes/global/Container'
import Flexbox from './nodes/global/Flexbox'
import Grid from './nodes/global/Grid'
import GridColumn from './nodes/global/GridColumn'

/**
 * Fixed bar that appears only in edit mode.
 * Adds a Flexbox or Container as the last child of the page (ROOT_NODE).
 */
export default function QuickAddBar() {
  const {actions, query} = useEditor()
  const [gridAdding, setGridAdding] = useState(false)
  const [gridColumns, setGridColumns] = useState(1)

  /** insert JSX as last child of ROOT */
  const append = (jsx) => {
    // 1️⃣  turn React element → NodeTree
    const tree = query.parseReactElement(jsx).toNodeTree()

    // 2️⃣  add it; index -1 = “append”
    actions.addNodeTree(tree, ROOT_NODE, -1)
  }

  const addGrid = async () => {
    // Add grid(parent of GridColumn) with columns(child of Grid) of Grid based on number of gridColumns

    /** 1️⃣  Build JSX for <Grid> with N <GridColumn> children */
    const jsx = (
      <Element
        is={Grid}
        canvas
      >
        {Array.from({length: gridColumns}, (_, i) => (
          <Element
            key={i}
            is={GridColumn}
            canvas
            /* optional prop: width fraction (Bootstrap style) */
            size={12 / gridColumns}
          />
        ))}
      </Element>
    )

    /** 2️⃣  Turn JSX → Craft NodeTree */
    const tree = query.parseReactElement(jsx).toNodeTree()

    /** 3️⃣  Append at root (-1 index means “after last child”) */
    actions.addNodeTree(tree, ROOT_NODE, -1)

    /** 4️⃣  Reset dialog state */
    setGridAdding(false)
    setGridColumns(1)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        py: 5,
        px: 2,
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 10,
        borderRadius: 0,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>
          append(
            <Element
              is={Flexbox}
              canvas
            />
          )
        }
      >
        Add Flexbox
      </Button>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>
          append(
            <Element
              is={Container}
              canvas
            />
          )
        }
      >
        Add Container
      </Button>

      <Dialog
        open={gridAdding}
        onClose={() => setGridAdding(false)}
      >
        <Card sx={{p: 1, width: '500px'}}>
          Select number of columns
          <Box sx={{display: 'flex', gap: 0.5}}>
            {[...Array(gridColumns)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  my: 2,
                  p: 0.5,
                  bgcolor: 'rgba(0, 0, 0, 0.06)',
                  width: '40px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption">{index + 1}</Typography>
              </Box>
            ))}
          </Box>
          <Slider
            min={1}
            max={12}
            step={1}
            valueLabelDisplay="auto"
            marks
            value={gridColumns}
            onChange={(e, v) => setGridColumns(v)} // v is guaranteed 1-12
          />
          <Button
            fullWidth
            size="small"
            variant="contained"
            disableElevation
            onClick={addGrid}
          >
            Add {gridColumns} columns grid
          </Button>
        </Card>
      </Dialog>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setGridAdding(true)}
      >
        Add Grid
      </Button>

      {/* <Button
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Import Starter Template
      </Button> */}
    </Paper>
  )
}
