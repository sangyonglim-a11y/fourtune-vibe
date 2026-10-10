import { lazy, Suspense } from 'react'
import { UserInput } from '../../features/user_input'
import { FortuneResult } from '../../features/fortune_result'
import { useFortuneAI, useFortuneState } from '../../shared/lib'
import './Home.css'

const CosmicBackground = lazy(() =>
  import('../../shared/ui/CosmicBackground').then((module) => ({
    default: module.CosmicBackground,
  })),
)

function Home() {
  const {
    prompt,
    result,
    is_loading,
    error,
    setResult,
    setIsLoading,
    setError,
    handlePromptChange,
  } = useFortuneState()
  const { askFortune } = useFortuneAI()

  const requestFortune = async () => {
    if (!prompt.trim() || is_loading) {
      return
    }

    setError(null)
    setResult('')
    setIsLoading(true)

    try {
      const fortune = await askFortune(prompt)
      setResult(fortune)
    } catch (err) {
      setError(err instanceof Error ? err.message : '운세를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="home">
      <Suspense fallback={null}>
        <CosmicBackground />
      </Suspense>
      <div className="home__atmosphere" aria-hidden="true" />

      <header className="home__brand">
        <p className="home__brand-mark">Fortune VIBE</p>
        <h1 className="home__headline">오늘의 기운을 물어보세요</h1>
        <p className="home__support">
          마음속 질문을 적으면, 짧은 운세 메시지로 답해드립니다.
        </p>
      </header>

      <div className="home__compose">
        <UserInput
          value={prompt}
          onChange={handlePromptChange}
          onSubmit={requestFortune}
          disabled={is_loading}
        />
        <FortuneResult
          isLoading={is_loading}
          answer={result}
          error={error}
        />
      </div>
    </main>
  )
}

export default Home
