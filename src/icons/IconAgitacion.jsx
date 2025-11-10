export const IconAgitacion = ({ size = 24, className = "", stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className || "w-5 h-5 mr-3"}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);
