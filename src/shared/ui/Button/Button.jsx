import './Button.css'

function Button({
  children,
  type = 'button',
  disabled = false,
  onClick,
  variant = 'primary',
}) {
  return (
    <button
      className={`ui-button ui-button--${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
