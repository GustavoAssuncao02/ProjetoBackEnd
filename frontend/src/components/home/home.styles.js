const styles = {
  page: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },

  header: {
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    gap: '20px',
    flexWrap: 'wrap'
  },

  logo: {
    color: '#fff',
    fontSize: '26px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },

  brand: {
    alignItems: 'center',
    color: '#fff',
    display: 'inline-flex',
    flexShrink: 0,
    gap: '8px',
    justifyContent: 'start',
    textDecoration: 'none',
    width: 'fit-content',
    cursor: 'pointer'
  },

  brandGroup: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: '8px'
  },

  brandLogoLink: {
    alignItems: 'center',
    display: 'flex',
    height: '50px',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '50px'
  },

  brandLogo: {
    display: 'block',
    height: '50px',
    maxHeight: '50px',
    maxWidth: '50px',
    objectFit: 'contain',
    width: '50px'
  },

  brandNameLink: {
    alignItems: 'center',
    color: '#fff',
    display: 'flex',
    fontSize: '26px',
    fontWeight: '900',
    height: '50px',
    letterSpacing: '1px',
    lineHeight: 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  },

  brandName: {
    alignItems: 'center',
    color: '#fff',
    display: 'inline-flex',
    fontSize: '26px',
    fontWeight: '900',
    height: '50px',
    letterSpacing: '1px',
    lineHeight: 1,
    position: 'relative',
    top: '-10px',
    transform: 'none',
    whiteSpace: 'nowrap'
  },

  searchForm: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '22px',
    display: 'flex',
    flex: '1 1 620px',
    maxWidth: '720px',
    minWidth: '420px',
    margin: 0,
    overflow: 'hidden'
  },

  search: {
    boxSizing: 'border-box',
    flex: 1,
    padding: '10px 14px',
    borderRadius: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#111',
    fontSize: '14px',
    width: '100%'
  },

  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    fontSize: '15px',
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },

  navItem: {
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },

  cartLink: {
    position: 'relative',
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },

  cartIcon: {
    display: 'block'
  },

  cartBadge: {
    alignItems: 'center',
    backgroundColor: '#dc2626',
    borderRadius: '999px',
    color: '#fff',
    display: 'flex',
    fontSize: '11px',
    fontWeight: '900',
    height: '18px',
    justifyContent: 'center',
    minWidth: '18px',
    padding: '0 5px',
    position: 'absolute',
    right: '-10px',
    top: '-10px'
  },

  infoBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    textAlign: 'center',
    backgroundColor: '#f3f3f3',
    fontSize: '12px',
    padding: '10px 0'
  },

  hero: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 2.4fr',
    minHeight: '420px',
    backgroundColor: '#d9d9d9'
  },

  heroLeft: {
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px'
  },

  heroText: {
    fontSize: '34px',
    fontWeight: 'bold',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    whiteSpace: 'pre-line'
  },

  heroRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '26px',
    padding: '28px 24px',
    backgroundColor: '#fff'
  },

  homeCarousel: {
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    padding: '32px clamp(32px, 7vw, 96px) 42px',
    width: '100%'
  },

  homeCarouselInner: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '1160px',
    width: '100%'
  },

  card: {
    textAlign: 'center'
  },

  cardImage: {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    borderRadius: '10px'
  },

  cardTitle: {
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '15px'
  },

  sectionTitle: {
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    padding: '18px',
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
}

export default styles
