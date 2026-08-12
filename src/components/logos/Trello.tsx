import { markSvgProps, type MarkProps } from './_shared';

export function TrelloMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="5.9" y="5.9" width="4.9" height="11" rx="1.1" fill="currentColor" />
      <rect x="13.2" y="5.9" width="4.9" height="6.6" rx="1.1" fill="currentColor" />
    </svg>
  );
}
