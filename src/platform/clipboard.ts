export async function copyText(value: string): Promise<void> {
  if (!value) {
    throw new Error('没有可复制的内容')
  }

  await new Promise<void>((resolve, reject) => {
    uni.setClipboardData({
      data: value,
      success: () => resolve(),
      fail: (error) => reject(error),
    })
  })
}

