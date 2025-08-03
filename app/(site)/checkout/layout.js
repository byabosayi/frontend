import AuthGate from './LayoutClient/AuthGate'

export default function Layout({children}) {
  return <AuthGate>{children}</AuthGate>
}
