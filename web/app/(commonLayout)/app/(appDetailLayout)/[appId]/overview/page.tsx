// import React from 'react'
import ChartView from './chartView'
import CardView from './cardView'
import ApikeyInfoPanel from '@/app/components/app/overview/apikey-info-panel'

export type IDevelopProps = {
  params: { appId: string }
}

const Overview = async ({
  params: { appId },
}: IDevelopProps) => {
  // Error:   16:23  error  React Hook "useTranslation" cannot be called in an async function  react-hooks/rules-of-hooks
  // const locale = getLocaleOnServer()
  // const { t } = await useTranslation(locale, 'app-overview')

  return (
    <div className="h-full px-16 py-6 overflow-scroll">
      <ApikeyInfoPanel />
      <div className='flex flex-row items-center justify-between mb-4 text-xl text-gray-900'>
        overview.title
      </div>
      <CardView appId={appId} />
      <ChartView appId={appId} />
    </div>
  )
}

export default Overview
