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

  backLink: {
    color: '#111827',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '18px',
    textDecoration: 'none'
  },

  detailCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '32px',
    padding: '24px',
    position: 'relative'
  },

  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#111827',
    cursor: 'pointer',
    display: 'flex',
    height: '36px',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: '22px',
    top: '20px',
    width: '36px',
    zIndex: 2
  },

  favoriteButtonActive: {
    color: '#dc2626'
  },

  gallery: {
    display: 'grid',
    gridTemplateColumns: '88px 1fr',
    gap: '16px'
  },

  thumbnails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  thumbnailButton: {
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    height: '88px',
    overflow: 'hidden',
    padding: 0,
    width: '88px'
  },

  activeThumbnail: {
    border: '2px solid #111827'
  },

  thumbnailImage: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },

  mainImageWrap: {
    alignItems: 'center',
    aspectRatio: '4 / 5',
    backgroundColor: '#ededed',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  mainImage: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },

  noImage: {
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '700'
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },

  productName: {
    color: '#111827',
    fontSize: '34px',
    fontWeight: '800',
    lineHeight: 1.1,
    margin: 0
  },

  ratingRow: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    marginTop: '-8px'
  },

  ratingStars: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: '2px'
  },

  star: {
    display: 'inline-block',
    lineHeight: 1,
    overflow: 'hidden',
    position: 'relative'
  },

  starEmpty: {
    color: '#d1d5db'
  },

  starFilled: {
    color: '#d4a017',
    left: 0,
    lineHeight: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    whiteSpace: 'nowrap'
  },

  ratingSummary: {
    color: '#6b7280',
    fontSize: '13px',
    fontWeight: '700'
  },

  price: {
    color: '#111827',
    fontSize: '22px',
    fontWeight: '800',
    margin: 0
  },

  oldPriceText: {
    color: '#6b7280',
    fontWeight: '600',
    textDecoration: 'line-through'
  },

  descriptionBlock: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px'
  },

  sectionTitle: {
    color: '#111827',
    fontSize: '15px',
    fontWeight: '800',
    margin: '0 0 8px',
    textTransform: 'uppercase'
  },

  description: {
    color: '#4b5563',
    fontSize: '16px',
    lineHeight: 1.5,
    margin: 0
  },

  colorOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },

  colorButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '999px',
    cursor: 'pointer',
    display: 'flex',
    gap: '8px',
    padding: '8px 12px'
  },

  activeColorButton: {
    border: '2px solid #111827'
  },

  colorDot: {
    border: '1px solid rgba(0,0,0,0.22)',
    borderRadius: '999px',
    display: 'inline-block',
    height: '22px',
    width: '22px'
  },

  colorLabel: {
    color: '#111827',
    fontSize: '14px',
    fontWeight: '700'
  },

  buyButton: {
    alignItems: 'center',
    backgroundColor: '#16a34a',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '18px',
    fontWeight: '800',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '8px',
    padding: '15px 18px',
    width: '100%'
  },

  buyButtonIcon: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center'
  },

  cartMessage: {
    backgroundColor: '#dcfce7',
    borderRadius: '8px',
    color: '#166534',
    fontSize: '14px',
    fontWeight: '800',
    margin: '-6px 0 0',
    padding: '12px',
    textAlign: 'center'
  },

  reviewsSection: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    marginTop: '24px',
    padding: '28px'
  },

  reviewsHeader: {
    alignItems: 'flex-start',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    gap: '18px',
    justifyContent: 'space-between',
    marginBottom: '22px',
    paddingBottom: '18px',
    flexWrap: 'wrap'
  },

  reviewsKicker: {
    color: '#6b7280',
    display: 'block',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.08em',
    marginBottom: '6px',
    textTransform: 'uppercase'
  },

  reviewsTitle: {
    color: '#111827',
    fontSize: '28px',
    fontWeight: '800',
    lineHeight: 1.1,
    margin: 0
  },

  reviewsScore: {
    alignItems: 'center',
    display: 'flex',
    gap: '9px',
    minHeight: '30px'
  },

  reviewsAverage: {
    color: '#111827',
    fontSize: '18px'
  },

  reviewsTotal: {
    color: '#6b7280',
    fontSize: '13px',
    fontWeight: '700'
  },

  reviewMessage: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '700',
    margin: '0 0 18px',
    padding: '12px 14px'
  },

  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  reviewEmptyState: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '700',
    padding: '18px',
    textAlign: 'center'
  },

  reviewItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '16px'
  },

  reviewItemHeader: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: '12px',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },

  reviewAuthor: {
    color: '#111827',
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px'
  },

  reviewItemStars: {
    display: 'flex'
  },

  reviewDate: {
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },

  reviewComment: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: 1.55,
    margin: 0
  },

  message: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    color: '#991b1b',
    fontWeight: '700',
    padding: '18px',
    textAlign: 'center'
  }
}

export default styles
