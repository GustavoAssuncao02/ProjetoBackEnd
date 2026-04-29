const styles = {
  section: {
    marginTop: '28px',
    overflow: 'hidden',
    width: '100%'
  },

  header: {
    alignItems: 'end',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '14px'
  },

  carouselArea: {
    alignItems: 'center',
    display: 'flex',
    gap: '14px',
    width: '100%'
  },

  title: {
    color: '#111827',
    fontSize: '24px',
    fontWeight: '900',
    margin: 0
  },

  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '700',
    margin: 0
  },

  arrowButton: {
    alignItems: 'center',
    backgroundColor: '#111827',
    border: 'none',
    borderRadius: '999px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    fontSize: '20px',
    fontWeight: '900',
    height: '42px',
    justifyContent: 'center',
    lineHeight: 1,
    width: '42px'
  },

  viewport: {
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },

  track: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    width: '100%'
  },

  link: {
    color: 'inherit',
    display: 'block',
    textDecoration: 'none'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    overflow: 'hidden'
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

  info: {
    padding: '12px'
  },

  name: {
    color: '#111827',
    fontSize: '15px',
    fontWeight: '900',
    margin: '0 0 7px'
  },

  price: {
    color: '#111827',
    fontSize: '14px',
    fontWeight: '800',
    margin: 0
  },

  oldPrice: {
    color: '#6b7280',
    fontWeight: '600',
    textDecoration: 'line-through'
  },

  message: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    color: '#6b7280',
    fontWeight: '700',
    padding: '18px',
    textAlign: 'center'
  }
}

export default styles
