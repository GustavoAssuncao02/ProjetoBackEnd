import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from '../../components/home/MainHeader'
import {
  CART_UPDATED_EVENT,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity
} from '../../utils/cartStorage'
import styles from './cart.styles'

const couponRules = {
  ORION10: {
    label: 'ORION10',
    discountPercent: 10
  },
  OUTLET20: {
    label: 'OUTLET20',
    discountPercent: 20
  }
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export default function Cart() {
  const [cartItems, setCartItems] = useState(getCartItems)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponMessage, setCouponMessage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function syncCartItems() {
      setCartItems(getCartItems())
    }

    window.addEventListener(CART_UPDATED_EVENT, syncCartItems)
    window.addEventListener('storage', syncCartItems)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCartItems)
      window.removeEventListener('storage', syncCartItems)
    }
  }, [])

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.unit_price || 0) * Number(item.quantity || 0)
    }, 0)
  }, [cartItems])

  const discount = useMemo(() => {
    if (!appliedCoupon) {
      return 0
    }

    return subtotal * (appliedCoupon.discountPercent / 100)
  }, [appliedCoupon, subtotal])

  const total = Math.max(subtotal - discount, 0)

  function handleQuantityChange(item, nextQuantity) {
    setCartItems(updateCartItemQuantity(item, nextQuantity))
  }

  function handleRemoveItem(item) {
    const nextCartItems = removeCartItem(item)
    setCartItems(nextCartItems)

    if (nextCartItems.length === 0) {
      setAppliedCoupon(null)
      setCouponCode('')
      setCouponMessage('')
    }
  }

  function handleApplyCoupon(e) {
    e.preventDefault()

    const normalizedCoupon = couponCode.trim().toUpperCase()

    if (!normalizedCoupon) {
      setAppliedCoupon(null)
      setCouponMessage('Digite um cupom para aplicar.')
      return
    }

    const coupon = couponRules[normalizedCoupon]

    if (!coupon) {
      setAppliedCoupon(null)
      setCouponMessage('Cupom inválido.')
      return
    }

    setAppliedCoupon(coupon)
    setCouponCode(normalizedCoupon)
    setCouponMessage(`Cupom ${coupon.label} aplicado: ${coupon.discountPercent}% de desconto.`)
  }

  function handleContinue() {
    if (cartItems.length === 0) {
      setMessage('Adicione pelo menos um produto ao carrinho para continuar.')
      return
    }

    setMessage('Carrinho pronto para continuar a compra.')
  }

  return (
    <div style={styles.page}>
      <MainHeader />

      <main style={styles.content}>
        <div style={styles.headerRow}>
          <h1 style={styles.title}>Carrinho</h1>
          <Link to="/allproducts" style={styles.keepBuyingLink}>
            Continuar comprando
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <section style={styles.emptyCart}>
            <h2 style={styles.emptyTitle}>Seu carrinho está vazio.</h2>
            <p style={styles.emptyText}>Escolha uma peça no catálogo para adicionar aqui.</p>
            <Link to="/allproducts" style={styles.catalogButton}>
              Ver produtos
            </Link>
          </section>
        ) : (
          <div style={styles.layout}>
            <section style={styles.itemsPanel}>
              {cartItems.map((item) => (
                <article
                  key={`${item.product_id}-${item.variant_id}-${item.color}-${item.size}`}
                  style={styles.cartItem}
                >
                  <div style={styles.imageWrap}>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} style={styles.image} />
                    ) : (
                      <span style={styles.noImage}>Sem imagem</span>
                    )}
                  </div>

                  <div style={styles.itemInfo}>
                    <h2 style={styles.productName}>{item.product_name}</h2>
                    <p style={styles.meta}>Cor: {item.color || '-'}</p>
                    <p style={styles.meta}>Tamanho: {item.size || '-'}</p>
                    <p style={styles.unitPrice}>{formatCurrency(item.unit_price)}</p>
                  </div>

                  <div style={styles.quantityControl}>
                    <button
                      type="button"
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, Number(item.quantity || 1) - 1)}
                      disabled={Number(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      style={styles.quantityInput}
                    />
                    <button
                      type="button"
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, Number(item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div style={styles.itemTotal}>
                    {formatCurrency(Number(item.unit_price || 0) * Number(item.quantity || 0))}
                  </div>

                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => handleRemoveItem(item)}
                  >
                    Excluir
                  </button>
                </article>
              ))}
            </section>

            <aside style={styles.summaryPanel}>
              <h2 style={styles.summaryTitle}>Resumo</h2>

              <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                <label htmlFor="coupon" style={styles.label}>
                  Cupom de desconto
                </label>
                <div style={styles.couponRow}>
                  <input
                    id="coupon"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Digite seu cupom"
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.applyCouponButton}>
                    Aplicar
                  </button>
                </div>
                {couponMessage && <p style={styles.couponMessage}>{couponMessage}</p>}
              </form>

              <div style={styles.summaryLine}>
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>

              <div style={styles.summaryLine}>
                <span>Desconto</span>
                <strong>- {formatCurrency(discount)}</strong>
              </div>

              <div style={styles.totalLine}>
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>

              <button type="button" style={styles.continueButton} onClick={handleContinue}>
                Continuar
              </button>

              {message && <p style={styles.message}>{message}</p>}
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
