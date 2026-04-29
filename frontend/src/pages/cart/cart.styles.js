const styles = {
  page: {
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh'
  },

  content: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '28px 24px 56px',
    width: '100%'
  },

  headerRow: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },

  title: {
    color: '#111827',
    fontSize: '34px',
    fontWeight: '900',
    margin: 0
  },

  keepBuyingLink: {
    color: '#111827',
    fontSize: '14px',
    fontWeight: '800',
    textDecoration: 'none'
  },

  layout: {
    alignItems: 'start',
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: '1fr 360px'
  },

  itemsPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  cartItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    display: 'grid',
    gap: '18px',
    gridTemplateColumns: '112px 1fr 142px 112px 92px',
    padding: '16px'
  },

  imageWrap: {
    alignItems: 'center',
    aspectRatio: '1 / 1',
    backgroundColor: '#ededed',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '112px'
  },

  image: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },

  noImage: {
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: '800',
    textAlign: 'center'
  },

  itemInfo: {
    minWidth: 0
  },

  productName: {
    color: '#111827',
    fontSize: '18px',
    fontWeight: '900',
    lineHeight: 1.2,
    margin: '0 0 8px'
  },

  meta: {
    color: '#4b5563',
    fontSize: '14px',
    fontWeight: '700',
    margin: '4px 0'
  },

  unitPrice: {
    color: '#111827',
    fontSize: '15px',
    fontWeight: '900',
    margin: '10px 0 0'
  },

  quantityControl: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '38px 56px 38px',
    justifyContent: 'center'
  },

  quantityButton: {
    backgroundColor: '#111827',
    border: '1px solid #111827',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '900',
    height: '38px',
    lineHeight: 1,
    width: '38px'
  },

  quantityInput: {
    border: '1px solid #d1d5db',
    boxSizing: 'border-box',
    color: '#111827',
    fontSize: '15px',
    fontWeight: '800',
    height: '38px',
    textAlign: 'center',
    width: '56px'
  },

  itemTotal: {
    color: '#111827',
    fontSize: '16px',
    fontWeight: '900',
    textAlign: 'right'
  },

  removeButton: {
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '800',
    padding: '12px'
  },

  summaryPanel: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    padding: '20px',
    position: 'sticky',
    top: '18px'
  },

  summaryTitle: {
    color: '#111827',
    fontSize: '22px',
    fontWeight: '900',
    margin: '0 0 18px'
  },

  couponForm: {
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '18px'
  },

  label: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: '800'
  },

  couponRow: {
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: '1fr 96px'
  },

  couponInput: {
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    boxSizing: 'border-box',
    color: '#111827',
    fontSize: '14px',
    padding: '12px',
    width: '100%'
  },

  applyCouponButton: {
    backgroundColor: '#111827',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '900',
    padding: '12px'
  },

  couponMessage: {
    color: '#374151',
    fontSize: '13px',
    fontWeight: '800',
    lineHeight: 1.4,
    margin: 0
  },

  summaryLine: {
    alignItems: 'center',
    color: '#374151',
    display: 'flex',
    fontSize: '15px',
    justifyContent: 'space-between',
    padding: '9px 0'
  },

  totalLine: {
    alignItems: 'center',
    borderTop: '1px solid #e5e7eb',
    color: '#111827',
    display: 'flex',
    fontSize: '20px',
    fontWeight: '900',
    justifyContent: 'space-between',
    marginTop: '8px',
    padding: '18px 0'
  },

  continueButton: {
    backgroundColor: '#16a34a',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '900',
    padding: '15px 18px',
    textTransform: 'uppercase',
    width: '100%'
  },

  message: {
    backgroundColor: '#dcfce7',
    borderRadius: '8px',
    color: '#166534',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: 1.4,
    margin: '14px 0 0',
    padding: '12px',
    textAlign: 'center'
  },

  emptyCart: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '56px 24px',
    textAlign: 'center'
  },

  emptyTitle: {
    color: '#111827',
    fontSize: '26px',
    fontWeight: '900',
    margin: '0 0 8px'
  },

  emptyText: {
    color: '#4b5563',
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 22px'
  },

  catalogButton: {
    backgroundColor: '#111827',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '900',
    padding: '13px 18px',
    textDecoration: 'none'
  }
}

export default styles
