import nextIntlPlugin from 'next-intl/plugin' // ✅  no “.js”

const withNextIntl = nextIntlPlugin({
  locales: ['en', 'bn'],
  defaultLocale: 'bn',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {unoptimized: true},
}

export default withNextIntl(nextConfig)
