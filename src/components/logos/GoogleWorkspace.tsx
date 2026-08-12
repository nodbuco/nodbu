import { markSvgProps, type MarkProps } from './_shared';

export function GoogleWorkspaceMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <path
        d="M21.5 12.2c0-.68-.06-1.33-.17-1.95H12v3.7h5.33a4.56 4.56 0 0 1-1.98 2.99v2.48h3.2c1.87-1.72 2.95-4.26 2.95-7.22Z"
        fill="currentColor"
      />
      <path
        d="M12 22c2.67 0 4.91-.89 6.55-2.4l-3.2-2.48c-.89.6-2.03.95-3.35.95-2.58 0-4.76-1.74-5.54-4.08H3.15v2.56A9.99 9.99 0 0 0 12 22Z"
        fill="currentColor"
        opacity=".78"
      />
      <path
        d="M6.46 13.99a5.99 5.99 0 0 1 0-3.83V7.6H3.15a10 10 0 0 0 0 8.95l3.31-2.56Z"
        fill="currentColor"
        opacity=".56"
      />
      <path
        d="M12 5.98c1.45 0 2.76.5 3.79 1.48l2.84-2.84C16.9 3.01 14.66 2 12 2 8.13 2 4.79 4.22 3.15 7.6l3.31 2.56C7.24 7.82 9.42 5.98 12 5.98Z"
        fill="currentColor"
        opacity=".78"
      />
    </svg>
  );
}
