type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export function Button({
  label,
  variant = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`ui-button ui-button-${variant}`}
    >
      {label}
    </button>
  );
}
