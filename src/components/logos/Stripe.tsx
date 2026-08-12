import { markSvgProps, type MarkProps } from './_shared';

export function StripeMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="currentColor">
      <path d="M13.1 9.4c0-.75.63-1.04 1.63-1.04 1.45 0 3.3.45 4.75 1.24V5.1A12.3 12.3 0 0 0 14.73 4.2c-3.84 0-6.4 2.03-6.4 5.42 0 5.3 7.98 4.45 7.98 6.73 0 .88-.77 1.17-1.84 1.17-1.58 0-3.62-.66-5.22-1.55v4.55c1.77.77 3.56 1.1 5.22 1.1 3.94 0 6.65-1.97 6.65-5.4 0-5.72-8.02-4.7-8.02-6.82Z" />
    </svg>
  );
}
