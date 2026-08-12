import { markSvgProps, type MarkProps } from './_shared';

export function SlackMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="currentColor">
      <path d="M5.1 14.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 0 1 4.2 0v5.25a2.1 2.1 0 0 1-4.2 0V14.9Z" />
      <path d="M9.1 5.1a2.1 2.1 0 1 1 2.1-2.1v2.1H9.1Zm0 1.05a2.1 2.1 0 0 1 0 4.2H3.85a2.1 2.1 0 0 1 0-4.2H9.1Z" />
      <path d="M18.9 9.1a2.1 2.1 0 1 1 2.1 2.1h-2.1V9.1Zm-1.05 0a2.1 2.1 0 0 1-4.2 0V3.85a2.1 2.1 0 0 1 4.2 0V9.1Z" />
      <path d="M14.9 18.9a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1Zm0-1.05a2.1 2.1 0 0 1 0-4.2h5.25a2.1 2.1 0 0 1 0 4.2H14.9Z" />
    </svg>
  );
}
