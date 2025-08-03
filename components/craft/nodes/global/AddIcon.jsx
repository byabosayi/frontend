import {Add} from '@mui/icons-material'
import {Box, Icon} from '@mui/material'

export default function AddIcon() {
  return (
    <Box
      sx={{
        p: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Icon
        sx={{
          color: 'rgba(0, 0, 0, 0.35)',
        }}
      >
        <Add />
      </Icon>
    </Box>
  )
}
