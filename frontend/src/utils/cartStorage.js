const CART_STORAGE_KEY = 'orion_outlet_cart'
export const CART_UPDATED_EVENT = 'orion-cart-updated'

export function getCartItems() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    const parsedCart = storedCart ? JSON.parse(storedCart) : []

    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

export function getCartItemCount() {
  return getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0)
}

export function addCartItem(item) {
  const cartItems = getCartItems()
  const normalizedItem = {
    ...item,
    quantity: Number(item.quantity || 1)
  }

  const existingItem = cartItems.find((cartItem) => {
    return (
      String(cartItem.product_id) === String(normalizedItem.product_id) &&
      String(cartItem.variant_id || '') === String(normalizedItem.variant_id || '') &&
      String(cartItem.color || '') === String(normalizedItem.color || '') &&
      String(cartItem.size || '') === String(normalizedItem.size || '')
    )
  })

  const nextCartItems = existingItem
    ? cartItems.map((cartItem) =>
        cartItem === existingItem
          ? {
              ...cartItem,
              quantity: Number(cartItem.quantity || 0) + normalizedItem.quantity
            }
          : cartItem
      )
    : [...cartItems, normalizedItem]

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCartItems))
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, {
      detail: {
        count: getCartItemCount()
      }
    })
  )

  return nextCartItems
}
