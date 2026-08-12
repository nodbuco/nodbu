import { markSvgProps, type MarkProps } from './_shared';

export function HubSpotMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <circle cx="18.2" cy="5.8" r="2.3" fill="currentColor" />
      <circle cx="10" cy="15.4" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 10.8V4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13.4 12.6l3-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
