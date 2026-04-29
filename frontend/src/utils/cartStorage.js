const CART_STORAGE_KEY = 'orion_outlet_cart'
export const CART_UPDATED_EVENT = 'orion-cart-updated'

function getItemIdentity(item) {
  return [
    String(item.product_id),
    String(item.variant_id || ''),
    String(item.color || ''),
    String(item.size || '')
  ].join('|')
}

function saveCartItems(cartItems) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, {
      detail: {
        count: cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0)
      }
    })
  )
}

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
    return getItemIdentity(cartItem) === getItemIdentity(normalizedItem)
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

  saveCartItems(nextCartItems)

  return nextCartItems
}

export function updateCartItemQuantity(targetItem, quantity) {
  const normalizedQuantity = Math.max(1, Number(quantity || 1))
  const targetIdentity = getItemIdentity(targetItem)
  const nextCartItems = getCartItems().map((item) =>
    getItemIdentity(item) === targetIdentity
      ? {
          ...item,
          quantity: normalizedQuantity
        }
      : item
  )

  saveCartItems(nextCartItems)
  return nextCartItems
}

export function removeCartItem(targetItem) {
  const targetIdentity = getItemIdentity(targetItem)
  const nextCartItems = getCartItems().filter(
    (item) => getItemIdentity(item) !== targetIdentity
  )

  saveCartItems(nextCartItems)
  return nextCartItems
}

export function clearCartItems() {
  saveCartItems([])
  return []
}
