'use client'
import useSWR from 'swr'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslation } from 'react-i18next'
import { fetchMembers } from '@/service/common'
import { getAppTokenCosts } from '@/service/apps'
import { useAppContext } from '@/context/app-context'
import AppIcon from '@/app/components/base/app-icon'
import Avatar from '@/app/components/base/avatar'

dayjs.extend(relativeTime)

const BillingCostPage = () => {
  const { t } = useTranslation()
  const { userProfile, apps } = useAppContext()

  const { data, mutate } = useSWR({ url: '/workspaces/current/members' }, fetchMembers)
  const accounts = data?.accounts || []
  const owner = accounts.filter(account => account.role === 'owner')?.[0]?.email === userProfile.email

  type TokenCostData = {
    currency: string
    date: string
    token_count: number
    total_price: string
  }

  type TokenCostResult = {
    total_count: number
    total_cost: number
  }

  function SumCost(data: TokenCostData[]): TokenCostResult {
    let totalCount = 0
    let totalCost = 0

    data.forEach((item) => {
      totalCount += item.token_count
      totalCost += parseFloat(item.total_price)
    })

    return {
      total_count: totalCount,
      total_cost: totalCost,
    }
  }

  function GetAppCost(appId: string): TokenCostResult {
    const { data: response } = useSWR({ url: `/apps/${appId}/statistics/token-costs` }, getAppTokenCosts)
    if (!response)
      return { total_count: 0, total_cost: 0 }

    const noDataFlag = !response.data || response.data.length === 0
    const appCost = !noDataFlag ? SumCost(response.data as []) : { total_count: 0, total_cost: 0 }

    return appCost
  }

  function FloatToPercent(value: number): string {
    // Convert to percentage with 2 decimal places
    const percent = (value * 100).toFixed(4)

    // Add % to the end
    return percent
  }

  return (
    <>
      <div>
        <div>
          <div className='flex items-center py-[7px] border-b border-gray-200'>
            <div className='grow px-3 text-xs font-medium text-gray-500'>{t('common.members.name')}</div>
            <div className='shrink-0 w-[112px] text-xs font-medium text-gray-500'>{t('common.members.totalConsumedToken')}</div>
            <div className='shrink-0 w-[104px] text-xs font-medium text-gray-500'>{t('common.members.totalConsumedCost')}</div>
            <div className='shrink-0 w-[96px] px-3 text-xs font-medium text-gray-500'>{t('common.members.rate')}</div>
          </div>
          <div>
            {
              apps.map(app => (
                <div key={app.id} className='flex border-b border-gray-100'>
                  <div className='grow flex items-center py-2 px-3'>
                    <Avatar size={24} className='mr-2' name={app.name} />
                    <div className='mr-3'>
                      <AppIcon size='tiny' />
                    </div>
                    <div className=''>
                      <div className='text-[13px] font-medium text-gray-700 leading-[18px]'>
                        {app.name}
                        {/* {account.status === 'pending' && <span className='ml-1 text-xs text-[#DC6803]'>{t('common.members.pending')}</span>}
                        {userProfile.email === account.email && <span className='text-xs text-gray-500'>{t('common.members.you')}</span>} */}
                      </div>
                      <div className='text-xs text-gray-500 leading-[18px]'>{app.id}</div>
                    </div>
                  </div>
                  <div className='shrink-0 flex items-center w-[104px] py-2 text-[13px] text-gray-700'>{GetAppCost(app.id).total_count}</div>
                  <div className='shrink-0 flex items-center w-[104px] py-2 text-[13px] text-gray-700'>
                    <span className='text-sm'>
                      <span className='text-orange-400'>~ { parseFloat(GetAppCost(app.id).total_cost.toString()).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 }) } </span>
                    </span>
                  </div>
                  <div className='shrink-0 flex items-center w-[104px] py-2 text-[13px] text-gray-700'>
                    <span>{ parseFloat(FloatToPercent(1 - GetAppCost(app.id).total_cost / 100.00)) } %</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default BillingCostPage
