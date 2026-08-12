import { markSvgProps, type MarkProps } from './_shared';

export function ExcelMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="m9 13 6 6" />
      <path d="m15 13-6 6" />
    </svg>
  );
}
