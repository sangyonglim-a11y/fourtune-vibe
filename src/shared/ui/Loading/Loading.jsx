import './Loading.css'

function Loading({ label = '운세를 읽는 중...' }) {
  return (
    <div className="ui-loading" role="status" aria-live="polite">
      <div className="ui-loading__orb" aria-hidden="true">
        <span className="ui-loading__ring" />
        <span className="ui-loading__core" />
      </div>
      <p className="ui-loading__label">{label}</p>
    </div>
  )
}

export default Loading
