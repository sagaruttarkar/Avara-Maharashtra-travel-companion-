type AvaraLogoProps = {
  compact?: boolean;
  className?: string;
};

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const logoSrc = `${basePath}/avara-logo.png`;

export default function AvaraLogo({ compact = false, className = "" }: AvaraLogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Avara Maharashtra travel logo"
      className={`avara-logo ${compact ? "compact" : ""} ${className}`.trim()}
    />
  );
}
