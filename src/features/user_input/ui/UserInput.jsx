import { Button, TextArea } from '../../../shared/ui'
import './UserInput.css'

function UserInput({ value, onChange, onSubmit, disabled = false }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <label className="user-input__label" htmlFor="fortune-question">
        궁금한 것을 적어보세요
      </label>
      <TextArea
        id="fortune-question"
        value={value}
        onChange={onChange}
        placeholder="예: 이번 주 나의 연애운은 어떨까?"
        disabled={disabled}
        rows={5}
        aria-label="운세 질문 입력"
      />
      <div className="user-input__actions">
        <Button type="submit" disabled={disabled || !value.trim()}>
          운세 보기
        </Button>
      </div>
    </form>
  )
}

export default UserInput
