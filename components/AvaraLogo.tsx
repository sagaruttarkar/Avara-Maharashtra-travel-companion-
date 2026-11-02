type AvaraLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function AvaraLogo({ compact = false, className = "" }: AvaraLogoProps) {
  return (
    <img
      src="/avara-logo.png"
      alt="Avara Maharashtra travel logo"
      className={`avara-logo ${compact ? "compact" : ""} ${className}`.trim()}
    />
  );
}
