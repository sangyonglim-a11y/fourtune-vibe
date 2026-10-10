import { useState } from 'react'

export function useFortuneState() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [is_loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
    if (error) {
      setError(null)
    }
  }

  return {
    prompt,
    result,
    is_loading,
    error,
    setPrompt,
    setResult,
    setIsLoading,
    setError,
    handlePromptChange,
  }
}
