export type CartSessionItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

const CART_KEY = "cart";

export function readCart(): CartSessionItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function writeCart(cart: CartSessionItem[]) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartItemCount(): number {
  return readCart().reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(item: CartSessionItem) {
  const cart = readCart();

  const existingIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (existingIndex >= 0) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      quantity: cart[existingIndex].quantity + item.quantity,
      unitPrice: item.unitPrice,
      image: item.image,
    };
  } else {
    cart.push(item);
  }

  writeCart(cart);
}