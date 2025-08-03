import './globals.css'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter'
import {Geist, Outfit, Hind_Siliguri, Noto_Sans_Bengali} from 'next/font/google'
import {MuiThemeProvider} from '@/libs/MuiThemeProvider'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale} from 'next-intl/server'
import {ReduxStoreProvider} from '@/libs/redux/ReduxStoreProvider'
import Snackbar from '@/components/Snackbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-siliguri',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  variable: '--font-noto-sans-bengali',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Byabosayi | ব্যবসায়ী | Wholesale meets free retail',
  description:
    'Byabosayi is an all-in-one AI driven b2b ecommerce platform in Bangladesh with features like wholesale products, free website creation, dropshipping, bidding, digital marketing, funding, loan, custom domain buy, and many more.',
}

export default async function Layout({children}) {
  const locale = await getLocale()
  return (
    <html
      lang={locale ?? 'en'}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${outfit.variable} ${hindSiliguri.variable} ${notoSansBengali.variable}`}
      >
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <ReduxStoreProvider>
              <NextIntlClientProvider>
                <Snackbar />
                {children}
              </NextIntlClientProvider>
            </ReduxStoreProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
