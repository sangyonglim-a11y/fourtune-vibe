import './TextArea.css'

function TextArea({
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 4,
  'aria-label': ariaLabel,
}) {
  return (
    <textarea
      id={id}
      className="ui-textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      aria-label={ariaLabel}
    />
  )
}

export default TextArea
