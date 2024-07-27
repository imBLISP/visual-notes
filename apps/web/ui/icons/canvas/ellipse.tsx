export function Ellipse({ className }: { className: string }) {
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
        d="M1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6ZM6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0Z"
      ></path>
    </svg>
  );
}
