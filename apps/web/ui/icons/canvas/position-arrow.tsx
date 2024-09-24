export function PositionArrow({ className }: { className: string }) {
  return (
    <svg
      role="img"
      width="16"
      height="16"
      focusable="false"
      aria-hidden="true"
      viewBox="5 0 40 40"
      className={className}
      style={{
        // drop-shadow(rgba(0, 0, 0, 0.25) 1px 0px 1px)
        filter: `drop-shadow(rgba(0,0,0,0.25) 1px 0px 1px)`,
        transform: `rotate(90deg)`
      }}
    >
    <path fill="white" xmlns="http://www.w3.org/2000/svg" d="M29.462,15.707c0,1.061-0.562,2.043-1.474,2.583L6.479,30.999c-0.47,0.275-0.998,0.417-1.526,0.417   c-0.513,0-1.026-0.131-1.487-0.396c-0.936-0.534-1.513-1.527-1.513-2.604V2.998c0-1.077,0.578-2.07,1.513-2.605   C4.402-0.139,5.553-0.13,6.479,0.415l21.509,12.709C28.903,13.664,29.462,14.646,29.462,15.707z"/>
    </svg>
  );
}
