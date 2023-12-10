'use client'
import type { FC } from 'react'
import React from 'react'

export type IModelNameProps = {
  modelId: string
  modelDisplayName?: string
}

export const supportI18nModelName = [
  'gpt-3.5-turbo', 'gpt-3.5-turbo-16k',
  'gpt-4', 'gpt-4-32k',
  'text-davinci-003', 'text-embedding-ada-002', 'whisper-1',
  'claude-instant-1', 'claude-2',
]

const ModelName: FC<IModelNameProps> = ({
  modelDisplayName,
}) => {
  return (
    <span className='text-ellipsis overflow-hidden whitespace-nowrap' title={modelDisplayName}>
      {modelDisplayName}
    </span>
  )
}

type ModelNameFormatters = {
  [key: string]: string
}

const modelNameFormatters: ModelNameFormatters = {
  'GPT-3.5-Turbo': '睿轩 4K[⚡️消耗1倍]',
  'GPT-3.5-Turbo-Instruct': '睿轩 4K-Instruct[⚡️消耗1.5倍]',
  'GPT-3.5-Turbo-16K': '睿轩 16K[⚡️消耗2倍]',
  'GPT-4': '睿轩 Pro  8K[⚡️消耗25倍]',
  'GPT-4-32K': '睿轩 Pro 32K[⚡️消耗50倍]',
  'Text-Davinci-003': '睿轩 Text[⚡️消耗25倍]',
  'Text-Embedding-Ada-002': '睿轩 Text-Embedding[⚡️消耗1倍]',
  'Whisper-1': 'Whisper-1[⚡️消耗1倍]',
  'gpt-35-turbo': '睿轩 Az  4K[⚡️消耗1倍]',
  'gpt-35-turbo-16k': '睿轩 Az 16K[⚡️消耗2倍]',
  'claude-instant-1': 'claude-instant-1',
  'claude-2': 'claude-2',
}

function getDisplayName(modelName: string): string {
  return modelNameFormatters[modelName] || modelName
}

export default React.memo(ModelName)
