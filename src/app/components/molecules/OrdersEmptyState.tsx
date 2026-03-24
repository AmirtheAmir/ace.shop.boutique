type Props = {
  title: string;
  subtitle: string;
};

export default function OrdersEmptyState({ title, subtitle }: Props) {
  return (
    <div className="bg-bg-surface p-5 ring ring-border-primary">
      <h2 className="font-L-600 text-text-primary">{title}</h2>
      <p className="mt-2 font-M-500 text-text-secondary">{subtitle}</p>
    </div>
  );
}