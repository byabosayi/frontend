'use client'

import {useState} from 'react'
import {
  Button,
  Typography,
  Box,
  Stack,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material'
import dynamic from 'next/dynamic'
import {Delete, FileUpload} from '@mui/icons-material'

const FileUploader = dynamic(() => import('@/components/FileUploader'), {
  ssr: false,
})

// const formatFileSize = (kilobytes) => {
//   if (kilobytes === 0) return '0 KB'
//   const k = 1024
//   const sizes = ['KB', 'MB', 'GB', 'TB']
//   const i = Math.floor(Math.log(kilobytes) / Math.log(k))
//   return parseFloat((kilobytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
// }

export default function File({
  name,
  label,
  value,
  multiple = false,
  helperText,
  touched,
  errorText,
  imageOnly,
  onChange,
}) {
  const [mediaOpen, setMediaOpen] = useState(false)

  const isImage = (file) => file?.type?.startsWith('image/')
  const hasFileValue = (file) => file?.name

  const imgStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '100px',
    objectFit: 'contain',
  }

  const handleDelete = (id) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((m) => m.id !== id))
    } else {
      onChange({})
    }
  }

  return (
    <Box sx={{p: 1, bgcolor: 'background.paper', height: '100%'}}>
      <Button
        size="small"
        variant="outlined"
        onClick={() => setMediaOpen(true)}
        sx={{mb: 2}}
      >
        {label || 'Upload File'}
        <FileUpload sx={{ml: 0.5, fontSize: '1.2rem'}} />
      </Button>

      {value && (
        <Box sx={{p: 1}}>
          {Array.isArray(value) && value.length > 0 ? (
            <Grid
              container
              spacing={1}
            >
              {value.map(
                (media) =>
                  hasFileValue(media) && (
                    <Grid
                      key={media.id}
                      size={{
                        xs: multiple ? 6 : 12,
                        md: multiple ? 4 : 12,
                        lg: multiple ? 3 : 12,
                        xl: multiple ? 2 : 12,
                        // xxl: multiple ? 2 : 12,
                      }}
                    >
                      {isImage(media) && (
                        <img
                          src={media.url}
                          alt={media.name}
                          style={imgStyle}
                        />
                      )}

                      <Typography
                        variant="subtitle1"
                        noWrap
                      >
                        {media.name}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="caption">
                          {media.type} : {media?.formatted?.size}
                        </Typography>

                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(media.id)}>
                            <Delete sx={{color: 'error.main'}} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            hasFileValue(value) && (
              <Box>
                {isImage(value) && (
                  <img
                    src={value.url}
                    alt={value.name}
                    style={imgStyle}
                  />
                )}

                <Typography
                  variant="subtitle1"
                  noWrap
                >
                  {value.name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">
                    {value.type} : {value?.formatted?.size}
                  </Typography>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(value.id)}>
                      <Delete sx={{color: 'error.main'}} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            )
          )}
        </Box>
      )}

      <FileUploader
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={onChange}
        multiple={multiple}
      />
    </Box>
  )
}
