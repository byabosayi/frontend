'use client'

import {
  Box,
  Grid as MuiGrid,
  Paper,
  TextField as MuiTextField,
  Typography,
  Divider,
} from '@mui/material'
import {useEditor} from '@craftjs/core'
import {Fragment, useMemo, useState} from 'react'

export default function Elements({nodes}) {
  const [elemnetQuery, setElemnetQuery] = useState('')
  const {connectors} = useEditor()

  const filteredElements = useMemo(() => {
    const q = elemnetQuery.trim().toLowerCase()

    if (!q) return nodes

    return nodes
      .map((group) => {
        // Filter items within each group
        const filteredItems = group.items.filter((item) =>
          item.name.toLowerCase().includes(q)
        )

        // Return a new group object only if it has matching items OR group name matches
        if (
          filteredItems.length > 0 ||
          group.groupName.toLowerCase().includes(q)
        ) {
          return {
            ...group,
            items: filteredItems.length > 0 ? filteredItems : group.items, // Show all items if group name matches
          }
        }
        return null
      })
      .filter(Boolean) // Remove null entries (groups with no matches)
  }, [elemnetQuery])

  return (
    <Box sx={{flexGrow: 1}}>
      <MuiTextField
        fullWidth
        label="Search element"
        variant="outlined"
        size="small"
        sx={{mb: 1}}
        value={elemnetQuery}
        onChange={(e) => setElemnetQuery(e.target.value)}
      />
      {/* <MuiGrid
        container
        spacing={1}
      >
        {filteredElements.map((element) => (
          <MuiGrid
            size={6}
            key={element.name}
          >
            <Paper
              ref={(ref) => connectors.create(ref, element.component)}
              sx={{
                p: 1,
                borderRadius: 1,
                alignContent: 'center',
                textAlign: 'center',
                height: 70,
                cursor: 'move',
              }}
            >
              {element.name}
            </Paper>
          </MuiGrid>
        ))}
      </MuiGrid> */}
      <Box>
        {filteredElements.length > 0 ? (
          filteredElements.map((group, index) => (
            <Fragment key={group.groupName}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{fontWeight: 'bold', mb: 1}}
                >
                  {group.groupName}
                </Typography>
                <MuiGrid
                  container
                  spacing={1}
                >
                  {group.items.length > 0 ? (
                    group.items.map((element) => (
                      <MuiGrid
                        size={6}
                        key={element.name}
                      >
                        <Paper
                          ref={(ref) =>
                            connectors.create(ref, element.component)
                          }
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            alignContent: 'center',
                            textAlign: 'center',
                            height: 70,
                            cursor: 'move',
                          }}
                        >
                          {element.name}
                        </Paper>
                      </MuiGrid>
                    ))
                  ) : (
                    <Typography variant="body2">No elements</Typography>
                  )}
                </MuiGrid>
              </Box>
              {/* Only show divider if not the last group */}
              {index < filteredElements.length - 1 && (
                <Divider sx={{my: 1.5}} />
              )}
            </Fragment>
          ))
        ) : (
          <Typography variant="body2">No element found</Typography>
        )}
      </Box>
    </Box>
  )
}
