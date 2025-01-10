import { SVGProps } from 'react'

export function LucideRefreshCcw(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <path d='M21 12a9 9 0 0 0-9-9a9.75 9.75 0 0 0-6.74 2.74L3 8'></path>
        <path d='M3 3v5h5m-5 4a9 9 0 0 0 9 9a9.75 9.75 0 0 0 6.74-2.74L21 16'></path>
        <path d='M16 16h5v5'></path>
      </g>
    </svg>
  )
}

export function LucideCopy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <rect
          width='14'
          height='14'
          x='8'
          y='8'
          rx='2'
          ry='2'
        ></rect>
        <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'></path>
      </g>
    </svg>
  )
}
