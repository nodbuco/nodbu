import { markSvgProps, type MarkProps } from './_shared';

export function SalesforceMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="currentColor">
      <path d="M9.9 6.6a3.6 3.6 0 0 1 5.7.7 4.3 4.3 0 0 1 1.8-.4 4.35 4.35 0 0 1 .6 8.65v.05H7.3a4.05 4.05 0 0 1-.7-8.04 3.6 3.6 0 0 1 3.3-.96Zm-.5 1.72a1.9 1.9 0 0 0-1.86 1.5l-.14.63-.64.09a2.35 2.35 0 0 0 .34 4.66h10.4a2.65 2.65 0 0 0-.1-5.3c-.42 0-.83.1-1.2.29l-.8.41-.44-.79a1.9 1.9 0 0 0-3.35.1l-.42.85-.83-.28a1.9 1.9 0 0 0-.96-.16Z" />
    </svg>
  );
}
