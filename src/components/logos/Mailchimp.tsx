import { markSvgProps, type MarkProps } from './_shared';

export function MailchimpMark(props: MarkProps) {
  return (
    <svg {...markSvgProps(props)} fill="none">
      <path
        d="M7.2 9.3c-.5-2.1.3-4.1 2-5 1.5-.8 3.2-.4 4.2.8.9-.5 1.9-.6 2.6-.1.8.5 1 1.5.6 2.5 1.3 1 2.1 2.6 2.1 4.4 0 3.4-2.9 6.1-6.5 6.1S5.7 15.3 5.7 11.9c0-.9.2-1.8.6-2.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.2" cy="11.6" r="1.05" fill="currentColor" />
      <circle cx="14.2" cy="11.6" r="1.05" fill="currentColor" />
      <path d="M10.6 15.2c.9.6 2 .6 2.9 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
