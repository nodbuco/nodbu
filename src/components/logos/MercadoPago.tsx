import { markSvgProps, type MarkProps } from './_shared';

export function MercadoPagoMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
      <path d="M9 11l-3 3 5 5 9-9-3-3-8 8" />
      <path d="M12 7l-3 3" />
      <path d="M15 10l-3 3" />
    </svg>
  );
}
