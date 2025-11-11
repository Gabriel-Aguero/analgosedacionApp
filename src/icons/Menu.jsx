export const Menu = ({
  size = 24,
  className = 'w-8 h-8',
  fill = 'currentColor',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={`icon icon-tabler icons-tabler-outline icon-tabler-menu-2 ${className}`}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </svg>
)
