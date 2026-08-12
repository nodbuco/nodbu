import { markSvgProps, type MarkProps } from './_shared';

export function AsanaMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="currentColor">
      <circle cx="12" cy="6.6" r="4.1" />
      <circle cx="5.6" cy="16.4" r="4.1" />
      <circle cx="18.4" cy="16.4" r="4.1" />
    </svg>
  );
}
