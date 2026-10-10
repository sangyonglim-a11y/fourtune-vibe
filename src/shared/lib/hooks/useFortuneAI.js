import { useCallback } from 'react'
import { generateFortune } from '../../api'

export function useFortuneAI() {
  const askFortune = useCallback(async (prompt) => {
    if (!prompt?.trim()) {
      throw new Error('질문을 입력해주세요.')
    }

    return generateFortune(prompt.trim())
  }, [])

  return { askFortune }
}
