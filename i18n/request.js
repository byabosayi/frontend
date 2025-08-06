import {getRequestConfig} from 'next-intl/server'
import {cookies} from 'next/headers'

export default getRequestConfig(async () => {
  const c = cookies().get('NEXT_LOCALE')?.value
  const locale = c ?? 'bn' // fallback

  // load *all* JSON files for that locale
  const messages = {
    // Global
    global: (await import(`../messages/${locale}/global.json`)).default,

    // By route/route-group/page
    group_auth: (await import(`../messages/${locale}/group-auth.json`)).default,
    page_home: (await import(`../messages/${locale}/page-home.json`)).default,
    page_products: (await import(`../messages/${locale}/page-products.json`))
      .default,
    page_cart: (await import(`../messages/${locale}/page-cart.json`)).default,
    page_checkout: (await import(`../messages/${locale}/page-checkout.json`))
      .default,
  }

  return {locale, messages}
})
