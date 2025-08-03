// app/components/media-uploader/MediaUploader.jsx
'use client'

import {useState, useRef, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  IconButton,
  Typography,
  Paper,
  InputAdornment,
  LinearProgress,
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Chip,
  Stack,
} from '@mui/material'
import {
  Search as SearchIcon,
  Close as CloseIcon,
  AddPhotoAlternate as AddPhotoIcon,
  InsertDriveFile as FileIcon,
  Videocam as VideoIcon,
  Audiotrack as AudioIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
} from '@mui/icons-material'
import api from '@/libs/axios'

export default function FileUploader({
  open,
  onClose,
  onSelect,
  multiple = false,
}) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    alt_text: '',
    caption: '',
    description: '',
  })
  const fileInputRef = useRef(null)

  // const isImage = (file) =>
  //   typeof file?.type === 'string' && file.type.startsWith('image/')
  const isImage = (file) =>
    typeof (file?.type || file?.mime_type) === 'string' &&
    (file.type || file.mime_type).startsWith('image/')

  const isVideo = (file) =>
    typeof (file?.type || file?.mime_type) === 'string' &&
    (file.type || file.mime_type).startsWith('video/')

  const isAudio = (file) =>
    typeof (file?.type || file?.mime_type) === 'string' &&
    (file.type || file.mime_type).startsWith('audio/')

  useEffect(() => {
    if (open) {
      fetchMedia()
    }
  }, [open, searchTerm])

  // const fetchMedia = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch(`/api/media?search=${searchTerm}`)
  //     const data = await response.json()
  //     setFiles(data.data || data)
  //   } catch (error) {
  //     console.error('Error fetching media:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchMedia = async () => {
    setLoading(true)
    try {
      //   const response = await fetch(
      //     `http://localhost:8000/api/v1/files?search=${searchTerm}`
      //   )
      //   const data = await response.json()

      //   setFiles(data.data || data)
      await api
        // .get(`files?search=${searchTerm}`)
        .get('files')
        .then((response) => {
          setFiles(response.data.data || response.data)
        })
        .catch((error) => {
          console.error(error.response?.data?.message)
        })
    } catch (error) {
      console.error('Error fetching media')
    } finally {
      setLoading(false)
    }
  }

  async function uploadFiles(files) {
    const uploads = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const fd = new FormData()
          fd.append('file', file)

          const xhr = new XMLHttpRequest()
          xhr.open('POST', 'http://localhost:8000/api/v1/files', true)
          xhr.setRequestHeader(
            'Authorization',
            'Bearer 21|YnGdOPAX9I26gIqrG0jWLWVBX8fUvg2WUegYC6eKfa090cd4'
          )

          xhr.onload = () => {
            xhr.status === 200 ? resolve(JSON.parse(xhr.response)) : reject()
          }
          xhr.onerror = reject
          xhr.send(fd)
        })
    )
    return Promise.all(uploads) // → array of server responses
  }

  const handleFileChange = async (e) => {
    const picked = Array.from(e.target.files)
    if (!picked.length) return

    setLoading(true)
    setUploadProgress(0)

    try {
      const response = await uploadFiles(picked) // ⇐ many files
      const uploaded = response.map((item) => item.data)
      setFiles((prev) => [...uploaded, ...prev])
      setSelectedFiles(uploaded)
    } catch {
      console.error('Upload failed')
    } finally {
      setLoading(false)
      setUploadProgress(0)
      e.target.value = '' // reset <input> so selecting same files again fires change
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await fetch(`/api/files/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setFiles((prev) => prev.filter((file) => file.id !== id))
      setSelectedFiles((prev) => prev.filter((file) => file.id !== id))
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const handleDeleteMultiple = async () => {
    if (
      !confirm(`Are you sure you want to delete ${selectedFiles.length} files?`)
    )
      return

    try {
      const deletePromises = selectedFiles.map((file) =>
        fetch(`/api/files/${file.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
      )

      await Promise.all(deletePromises)
      setFiles((prev) =>
        prev.filter(
          (file) => !selectedFiles.some((selected) => selected.id === file.id)
        )
      )
      setSelectedFiles([])
    } catch (error) {
      console.error('Error deleting files:', error)
    }
  }

  const toggleFileSelection = (file) => {
    if (multiple) {
      setSelectedFiles((prev) => {
        const exists = prev.some((f) => f.id === file.id)
        if (exists) {
          return prev.filter((f) => f.id !== file.id)
        } else {
          return [...prev, file]
        }
      })
    } else {
      setSelectedFiles([file])
    }
  }

  const isFileSelected = (file) => {
    return selectedFiles.some((f) => f.id === file.id)
  }

  const handleEdit = () => {
    if (selectedFiles.length !== 1) return
    const fileToEdit = selectedFiles[0]

    if (editMode) {
      saveEdit(fileToEdit)
    } else {
      setEditData({
        name: fileToEdit.name,
        alt_text: fileToEdit.alt_text || '',
        caption: fileToEdit.caption || '',
        description: fileToEdit.description || '',
      })
      setEditMode(true)
    }
  }

  const saveEdit = async (file) => {
    try {
      const response = await fetch(`/api/media/${file.id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editData),
      })

      const updatedFile = await response.json()
      setFiles((prev) =>
        prev.map((f) => (f.id === updatedFile.id ? updatedFile : f))
      )
      setSelectedFiles((prev) =>
        prev.map((f) => (f.id === updatedFile.id ? updatedFile : f))
      )
      setEditMode(false)
    } catch (error) {
      console.error('Error updating file:', error)
    }
  }

  const getFileIcon = (file) =>
    isImage(file) ? (
      <AddPhotoIcon />
    ) : isVideo(file) ? (
      <VideoIcon />
    ) : isAudio(file) ? (
      <AudioIcon />
    ) : (
      <FileIcon />
    )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Media Library</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
        >
          <Grid size={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <TextField
                placeholder="Search media..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{width: '50%'}}
              />
              <Box
                display="flex"
                gap={1}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddPhotoIcon />}
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  style={{display: 'none'}}
                  onChange={handleFileChange}
                />
              </Box>
            </Box>
            {loading && uploadProgress === 0 && <LinearProgress />}
            {uploadProgress > 0 && (
              <Box mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                />
                <Typography variant="caption">{uploadProgress}%</Typography>
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={multiple ? 7 : 8}
          >
            <Grid
              container
              spacing={1}
            >
              {files.map((file, index) => (
                <Grid
                  key={index}
                  size={{xs: 6, sm: 4, md: 3}}
                >
                  <Paper
                    elevation={isFileSelected(file) ? 3 : 1}
                    onClick={() => toggleFileSelection(file)}
                    sx={{
                      p: 1,
                      cursor: 'pointer',
                      border: isFileSelected(file)
                        ? '2px solid #1976d2'
                        : 'none',
                      height: '100%',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: 4,
                      },
                    }}
                  >
                    {multiple && (
                      <Checkbox
                        checked={isFileSelected(file)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          zIndex: 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        }}
                      />
                    )}
                    {isImage(file) ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="120px"
                      >
                        {getFileIcon(file)}
                        <Typography
                          variant="caption"
                          mt={1}
                        >
                          {file.name}
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="caption">{file.name}</Typography>
                    <Typography
                      variant="caption"
                      display="block"
                    >
                      {/* {formatFileSize(file.size)} */}
                      {file?.formatted?.size}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={multiple ? 5 : 4}
          >
            {selectedFiles.length > 0 ? (
              <Paper
                elevation={3}
                sx={{p: 2, height: '100%'}}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6">
                    {selectedFiles.length > 1
                      ? `${selectedFiles.length} Files Selected`
                      : 'Attachment Details'}
                  </Typography>
                  <Box>
                    {selectedFiles.length === 1 && (
                      <>
                        <IconButton onClick={handleEdit}>
                          {editMode ? <CheckIcon /> : <EditIcon />}
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(selectedFiles[0].id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                    {selectedFiles.length > 1 && (
                      <IconButton onClick={handleDeleteMultiple}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {selectedFiles.length === 1 ? (
                  <>
                    {isImage(selectedFiles[0]) && (
                      <img
                        src={selectedFiles[0].url}
                        alt={selectedFiles[0].name}
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                        }}
                      />
                    )}

                    {editMode ? (
                      <>
                        <TextField
                          label="File Name"
                          fullWidth
                          margin="normal"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({...editData, name: e.target.value})
                          }
                        />
                        <TextField
                          label="Alt Text"
                          fullWidth
                          margin="normal"
                          value={editData.alt_text}
                          onChange={(e) =>
                            setEditData({...editData, alt_text: e.target.value})
                          }
                        />
                        <TextField
                          label="Caption"
                          fullWidth
                          margin="normal"
                          value={editData.caption}
                          onChange={(e) =>
                            setEditData({...editData, caption: e.target.value})
                          }
                        />
                        <TextField
                          label="Description"
                          fullWidth
                          multiline
                          rows={3}
                          margin="normal"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                        >
                          {selectedFiles[0].name}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                        >
                          <strong>URL:</strong> {selectedFiles[0].url}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                        >
                          <strong>File size:</strong>{' '}
                          {/* {formatFileSize(selectedFiles[0].size)} */}
                          {selectedFiles[0]?.formatted?.size}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                        >
                          <strong>Uploaded on:</strong>{' '}
                          {new Date(
                            selectedFiles[0].created_at
                          ).toLocaleString()}
                        </Typography>
                        {selectedFiles[0].alt_text && (
                          <Typography
                            variant="body2"
                            gutterBottom
                          >
                            <strong>Alt Text:</strong>{' '}
                            {selectedFiles[0].alt_text}
                          </Typography>
                        )}
                        {selectedFiles[0].caption && (
                          <Typography
                            variant="body2"
                            gutterBottom
                          >
                            <strong>Caption:</strong> {selectedFiles[0].caption}
                          </Typography>
                        )}
                        {selectedFiles[0].description && (
                          <Typography
                            variant="body2"
                            gutterBottom
                          >
                            <strong>Description:</strong>{' '}
                            {selectedFiles[0].description}
                          </Typography>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <Box sx={{maxHeight: '400px', overflowY: 'auto'}}>
                    <Stack spacing={1}>
                      {selectedFiles.map((file, index) => (
                        <Paper
                          key={index}
                          sx={{p: 1, display: 'flex', alignItems: 'center'}}
                        >
                          <Box sx={{mr: 2}}>
                            {isImage(file) ? (
                              <Avatar
                                src={file.url}
                                variant="square"
                                sx={{width: 56, height: 56}}
                              />
                            ) : (
                              <Avatar sx={{width: 56, height: 56}}>
                                {getFileIcon(file)}
                              </Avatar>
                            )}
                          </Box>
                          <Box sx={{flexGrow: 1, minWidth: 0}}>
                            <Typography
                              noWrap
                              sx={{fontWeight: 'bold'}}
                            >
                              {file.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                            >
                              {/* {formatFileSize(file.size)} */}
                              {file?.formatted?.size}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              noWrap
                            >
                              {file.type}
                            </Typography>
                          </Box>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Paper>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  {multiple
                    ? 'Select one or more files'
                    : 'Select a file to view details'}
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          disabled={selectedFiles.length === 0}
          onClick={() => setSelectedFiles([])}
        >
          {multiple ? `Unselect ${selectedFiles.length} Items` : 'Unselect'}
        </Button>
        <Button
          variant="contained"
          disabled={selectedFiles.length === 0}
          onClick={() => {
            onSelect(multiple ? selectedFiles : selectedFiles[0])
            onClose()
          }}
        >
          {multiple ? `Select ${selectedFiles.length} Items` : 'Select'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
