import HeaderLive from '@/components/craft/live/HeaderLive'
import FooterLive from '@/components/craft/live/FooterLive'

// Fetch from your database
const headerTemplate = {}
const footerTemplate = {}

export default function Layout({children}) {
  return (
    <>
      {HeaderLive(headerTemplate)} {children} {FooterLive(footerTemplate)}
    </>
  )
}
