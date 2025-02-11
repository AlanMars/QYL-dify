import I18nServer from './components/i18n-server'
import BrowerInitor from './components/browser-initor'
import SentryInitor from './components/sentry-initor'
import { getLocaleOnServer } from '@/i18n/server'

import './styles/globals.css'
import './styles/markdown.scss'

export const metadata = {
  title: 'RACIO',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no',
}

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = getLocaleOnServer()

  return (
    <html lang={locale ?? 'en'} className="h-full">
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className="h-full select-auto"
        data-api-prefix={process.env.NEXT_PUBLIC_API_PREFIX}
        data-pubic-api-prefix={process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX}
        data-public-edition={process.env.NEXT_PUBLIC_EDITION}
        data-public-sentry-dsn={process.env.NEXT_PUBLIC_SENTRY_DSN}
        data-public-maintenance-notice={process.env.NEXT_PUBLIC_MAINTENANCE_NOTICE}
        data-public-site-about={process.env.NEXT_PUBLIC_SITE_ABOUT}
      >
        <BrowerInitor>
          <SentryInitor>
            {/* @ts-expect-error Async Server Component */}
            <I18nServer locale={locale}>{children}</I18nServer>
          </SentryInitor>
        </BrowerInitor>
      </body>
    </html>
  )
}

export default LocaleLayout
