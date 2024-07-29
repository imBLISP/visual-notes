export function Rectangle({ className }: { className: string }) {
  return (
    <svg
      role="img"
      width="12"
      height="12"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 12 12"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M1.5 1.5V10.5H10.5V1.5H1.5ZM1 0C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H11C11.5523 12 12 11.5523 12 11V1C12 0.447715 11.5523 0 11 0H1Z"
      ></path>
    </svg>
  );
}
