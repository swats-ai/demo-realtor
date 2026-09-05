/* Iconos outline (24×24, stroke) para los pasos y los servicios. */

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export const ChatIcon = () => <Icon d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Zm-12-1h6m-6 3.5h4" />;
export const CompassIcon = () => <Icon d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />;
export const DocIcon = () => <Icon d="M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5m-5 3.5h5m-5-7h2" />;
export const KeyIcon = () => <Icon d="M14.5 3.5a6 6 0 0 0-5.7 7.8L3 17.1V21h3.9l1.2-1.2v-2.1h2.1l1.6-1.6a6 6 0 1 0 2.7-12.6Zm1.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />;
export const HomeIcon = () => <Icon d="M3 11.5 12 4l9 7.5M5.5 9.8V20h13V9.8M10 20v-6h4v6" />;
export const ChartIcon = () => <Icon d="M4 20V10m5.5 10V4M15 20v-7m5 7V8M2 20h20" />;
export const CameraIcon = () => <Icon d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm8 8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />;
export const PinIcon = () => <Icon d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />;
