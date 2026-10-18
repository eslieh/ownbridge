import { registerPropertyMessage, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36A9.4 9.4 0 0 1 2.6 12C2.6 6.8 6.84 2.56 12.05 2.56c2.52 0 4.9.99 6.68 2.77a9.36 9.36 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.69L.58 23.3l5.68-1.49a11.36 11.36 0 0 0 5.79 1.47c6.26 0 11.37-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04" />
    </svg>
  );
}

/** Floating "List your property" button — opens WhatsApp with a prefilled registration template. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(registerPropertyMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Register your property on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex h-14 items-center gap-2 rounded-full bg-whatsapp pr-4 pl-4 text-white shadow-[var(--shadow-float)] transition-all hover:pr-5 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-200 group-hover:max-w-48 sm:max-w-48">
        List your property
      </span>
    </a>
  );
}
