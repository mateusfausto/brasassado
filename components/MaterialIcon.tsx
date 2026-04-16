interface MaterialIconProps {
  name: string
  className?: string
  size?: number
  filled?: boolean
}

export default function MaterialIcon({
  name,
  className = '',
  size = 24,
  filled = false,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        lineHeight: 1,
        verticalAlign: 'middle',
      }}
    >
      {name}
    </span>
  )
}
