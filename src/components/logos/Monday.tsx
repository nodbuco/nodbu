import { markSvgProps, type MarkProps } from './_shared';

export function MondayMark(props: MarkProps) {
  return (
    <svg
      {...markSvgProps(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 15.4 6.2 9.2 9.4 15.4" />
      <path d="M10.8 15.4 14 9.2l3.2 6.2" />
      <circle cx="20.4" cy="13.6" r="1.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
