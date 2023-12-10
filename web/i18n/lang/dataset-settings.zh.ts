const translation = {
  title: '知识库设置',
  desc: '在这里您可以修改知识库的工作方式以及其它设置。',
  form: {
    name: '知识库名称',
    namePlaceholder: '请输入知识库名称',
    nameError: '名称不能为空',
    desc: '知识库描述',
    descInfo: '请写出清楚的文字描述来概述知识库的内容。当从多个知识库中进行选择匹配时，该描述将用作匹配的基础。',
    descPlaceholder: '描述这个知识库中的内容。详细的描述可以让 AI 及时访问知识库的内容。如果为空，RACIO 将使用默认的命中策略。',
    descWrite: '了解如何编写更好的知识库描述。',
    permissions: '可见权限',
    permissionsOnlyMe: '只有我',
    permissionsAllMember: '所有团队成员',
    indexMethod: '索引模式',
    indexMethodHighQuality: '高质量',
    indexMethodHighQualityTip: '调用 OpenAI 的嵌入接口进行处理，以在用户查询时提供更高的准确度',
    indexMethodEconomy: '经济',
    indexMethodEconomyTip: '使用离线的向量引擎、关键词索引等方式，降低了准确度但无需花费 Token',
    embeddingModel: 'Embedding 模型',
    embeddingModelTip: '修改 Embedding 模型，请去',
    embeddingModelTipLink: '设置',
    retrievalSetting: {
      title: '检索设置',
      learnMore: '了解更多',
      description: '关于检索方法。',
      longDescription: '关于检索方法，您可以随时在知识库设置中更改此设置。',
    },
    save: '保存',
  },
}

export default translation
