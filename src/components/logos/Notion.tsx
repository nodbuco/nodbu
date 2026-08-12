import { markSvgProps, type MarkProps } from './_shared';

export function NotionMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 16.5v-9l8 9v-9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
