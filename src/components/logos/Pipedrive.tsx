import { markSvgProps, type MarkProps } from './_shared';

export function PipedriveMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <path
        d="M9 22V4.6C10.1 3.6 11.6 3 13.4 3 17.2 3 20 6 20 10.2c0 4.2-2.9 7.2-6.8 7.2-1.7 0-3.1-.6-4.2-1.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13.2" cy="10.2" r="2.6" fill="currentColor" />
    </svg>
  );
}
