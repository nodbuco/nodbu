import { markSvgProps, type MarkProps } from './_shared';

export function ActiveCampaignMark(props: MarkProps) {
  return (
    <svg
      {...markSvgProps(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 5.2 14 12l-9.5 6.8" />
      <path d="M14.5 8.9 19 12l-4.5 3.1" />
    </svg>
  );
}
