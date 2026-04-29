const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  },

  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '28px 24px 48px'
  },

  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },

  title: {
    fontSize: '30px',
    fontWeight: '800',
    margin: 0,
    color: '#111827'
  },

  sortGroup: {
    alignItems: 'center',
    display: 'flex',
    gap: '10px'
  },

  searchResultLabel: {
    color: '#4b5563',
    fontSize: '14px',
    fontWeight: '700',
    margin: '-8px 0 18px'
  },

  label: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: '700'
  },

  select: {
    backgroundColor: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    color: '#111827',
    fontSize: '14px',
    minWidth: '190px',
    padding: '11px 12px',
    width: '100%'
  },

  sortSelect: {
    backgroundColor: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    color: '#111827',
    fontSize: '14px',
    minWidth: '240px',
    padding: '11px 12px'
  },

  layout: {
    alignItems: 'start',
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '24px'
  },

  filters: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    padding: '18px',
    position: 'sticky',
    top: '18px'
  },

  filtersTitle: {
    color: '#111827',
    fontSize: '18px',
    fontWeight: '800',
    margin: '0 0 16px'
  },

  filterField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '14px'
  },

  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '190px',
    overflowY: 'auto',
    paddingRight: '4px'
  },

  checkboxOption: {
    alignItems: 'center',
    color: '#111827',
    cursor: 'pointer',
    display: 'flex',
    gap: '9px',
    fontSize: '14px',
    fontWeight: '700'
  },

  checkboxInput: {
    cursor: 'pointer',
    height: '16px',
    margin: 0,
    width: '16px'
  },

  checkboxText: {
    lineHeight: 1.2
  },

  clearButton: {
    backgroundColor: '#111827',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    padding: '12px',
    width: '100%'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '18px'
  },

  productCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    overflow: 'hidden'
  },

  productLink: {
    color: 'inherit',
    display: 'block',
    textDecoration: 'none'
  },

  imageWrap: {
    aspectRatio: '4 / 5',
    backgroundColor: '#ededed',
    overflow: 'hidden'
  },

  image: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },

  noImage: {
    alignItems: 'center',
    color: '#6b7280',
    display: 'flex',
    fontSize: '14px',
    fontWeight: '700',
    height: '100%',
    justifyContent: 'center'
  },

  productInfo: {
    padding: '14px'
  },

  productName: {
    color: '#111827',
    fontSize: '16px',
    fontWeight: '800',
    margin: '0 0 8px'
  },

  description: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: 1.4,
    margin: '0 0 12px',
    minHeight: '40px'
  },

  price: {
    color: '#111827',
    fontSize: '16px',
    fontWeight: '800',
    margin: 0
  },

  oldPriceText: {
    color: '#6b7280',
    fontWeight: '600',
    textDecoration: 'line-through'
  },

  unavailablePrice: {
    color: '#dc2626',
    fontWeight: '900'
  },

  emptyState: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    color: '#4b5563',
    fontWeight: '700',
    padding: '28px',
    textAlign: 'center'
  },

  message: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    color: '#991b1b',
    fontWeight: '700',
    marginBottom: '16px',
    padding: '14px',
    textAlign: 'center'
  }
}

export default styles
