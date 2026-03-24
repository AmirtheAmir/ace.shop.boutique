type Props = {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export default function AccountActionIconButton({
  children,
  onClick,
  label,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="text-brand-primary transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:text-text-tertiary"
    >
      {children}
    </button>
  );
}