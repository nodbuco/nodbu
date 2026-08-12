import { markSvgProps, type MarkProps } from './_shared';

export function ZendeskMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="m4.9 4.9 4.2 4.2" />
      <path d="m14.9 14.9 4.2 4.2" />
      <path d="m14.9 9.1 4.2-4.2" />
      <path d="m4.9 19.1 4.2-4.2" />
    </svg>
  );
}
