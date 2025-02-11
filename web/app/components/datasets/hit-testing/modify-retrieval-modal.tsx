'use client'
import type { FC } from 'react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Toast from '../../base/toast'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import type { RetrievalConfig } from '@/types/app'
import RetrievalMethodConfig from '@/app/components/datasets/common/retrieval-method-config'
import EconomicalRetrievalMethodConfig from '@/app/components/datasets/common/economical-retrieval-method-config'
import Button from '@/app/components/base/button'
import { useProviderContext } from '@/context/provider-context'
import { ensureRerankModelSelected, isReRankModelSelected } from '@/app/components/datasets/common/check-rerank-model'

type Props = {
  indexMethod: string
  value: RetrievalConfig
  isShow: boolean
  onHide: () => void
  onSave: (value: RetrievalConfig) => void
}

const ModifyRetrievalModal: FC<Props> = ({
  indexMethod,
  value,
  isShow,
  onHide,
  onSave,
}) => {
  const ref = useRef(null)
  const { t } = useTranslation()
  const [retrievalConfig, setRetrievalConfig] = useState(value)

  // useClickAway(() => {
  //   if (ref)
  //     onHide()
  // }, ref)

  const {
    rerankDefaultModel,
    isRerankDefaultModelVaild,
    rerankModelList,
  } = useProviderContext()

  const handleSave = () => {
    if (
      !isReRankModelSelected({
        rerankDefaultModel,
        isRerankDefaultModelVaild,
        rerankModelList,
        retrievalConfig,
        indexMethod,
      })
    ) {
      Toast.notify({ type: 'error', message: t('appDebug.datasetConfig.rerankModelRequired') })
      return
    }
    onSave(ensureRerankModelSelected({
      rerankDefaultModel: rerankDefaultModel!,
      retrievalConfig,
      indexMethod,
    }))
  }

  if (!isShow)
    return null

  return (
    <div
      className='w-full flex flex-col bg-white border-[0.5px] border-gray-200 rounded-xl shadow-xl'
      style={{
        height: 'calc(100vh - 72px)',
      }}
      ref={ref}
    >
      <div className='shrink-0 flex justify-between items-center pl-6 pr-5 h-14 border-b border-b-gray-100'>
        <div className='text-base font-semibold text-gray-900'>
          <div>{t('datasetSettings.form.retrievalSetting.title')}</div>
          {/* <div className='leading-[18px] text-xs font-normal text-gray-500'>
            <a target='_blank' href='https://docs.dify.ai/advanced/retrieval-augment' className='text-[#155eef]'>{t('datasetSettings.form.retrievalSetting.learnMore')}</a>
            {t('datasetSettings.form.retrievalSetting.description')}
          </div> */}
        </div>
        <div className='flex items-center'>
          <div
            onClick={onHide}
            className='flex justify-center items-center w-6 h-6 cursor-pointer'
          >
            <XClose className='w-4 h-4 text-gray-500' />
          </div>
        </div>
      </div>

      <div className='p-6 border-b' style={{
        borderBottom: 'rgba(0, 0, 0, 0.05)',
      }}>
        {indexMethod === 'high_quality'
          ? (
            <RetrievalMethodConfig
              value={retrievalConfig}
              onChange={setRetrievalConfig}
            />
          )
          : (
            <EconomicalRetrievalMethodConfig
              value={retrievalConfig}
              onChange={setRetrievalConfig}
            />
          )}
      </div>
      <div
        className='flex justify-end pt-6 px-6 border-t'
        style={{
          borderColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <Button className='mr-2 flex-shrink-0' onClick={onHide}>{t('common.operation.cancel')}</Button>
        <Button type='primary' className='flex-shrink-0' onClick={handleSave} >{t('common.operation.save')}</Button>
      </div>
    </div>
  )
}
export default React.memo(ModifyRetrievalModal)
