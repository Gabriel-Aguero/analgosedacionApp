export const Check = ({
  size = 24,
  className = "",
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={`icon icon-tabler icons-tabler-outline icon-tabler-check ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
  </svg>
);
