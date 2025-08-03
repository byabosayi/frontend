import {Box} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DarkModeLogo from './DarkModeLogo'

export default function Logo() {
  return (
    <DarkModeLogo>
      <Box
        component={Link}
        href="/"
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Image
          src="/byabosayi-logo.svg"
          alt="Byabosayi Logo | ব্যবসায়ী লোগো"
          width={80}
          height={30}
          aria-level="Byabosayi Logo | ব্যবসায়ী লোগো"
        />
      </Box>
    </DarkModeLogo>
  )
}
