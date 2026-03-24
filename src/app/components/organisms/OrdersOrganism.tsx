import OrdersEmptyState from "../molecules/OrdersEmptyState";

export default function OrdersOrganism() {
  return (
    <section className="mt-8 max-w-5xl">
      <OrdersEmptyState
        title="Orders"
        subtitle="No orders yet."
      />
    </section>
  );
}