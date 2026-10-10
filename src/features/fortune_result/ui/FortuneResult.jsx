import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Loading } from '../../../shared/ui'
import './FortuneResult.css'

function FortuneResult({ isLoading = false, answer = '', error = null }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(answer)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (isLoading) {
    return (
      <section className="fortune-result" aria-label="운세 결과">
        <Loading />
      </section>
    )
  }

  if (error) {
    return (
      <section
        className="fortune-result fortune-result--error"
        aria-label="운세 결과"
        role="alert"
      >
        <h2 className="fortune-result__title">메시지를 읽지 못했어요</h2>
        <p className="fortune-result__error">{error}</p>
      </section>
    )
  }

  if (!answer) {
    return (
      <section className="fortune-result fortune-result--empty" aria-label="운세 결과">
        <p className="fortune-result__placeholder">
          질문을 남기면, 여기에 오늘의 기운이 펼쳐집니다.
        </p>
      </section>
    )
  }

  return (
    <section className="fortune-result fortune-result--filled" aria-label="운세 결과">
      <h2 className="fortune-result__title">오늘의 메시지</h2>
      <div className="fortune-result__answer">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
      <div className="fortune-result__share">
        <Button variant="ghost" onClick={handleShare}>
          {copied ? '기록이 남겨졌습니다' : '운명의 기록 긁어가기'}
        </Button>
      </div>
    </section>
  )
}

export default FortuneResult
