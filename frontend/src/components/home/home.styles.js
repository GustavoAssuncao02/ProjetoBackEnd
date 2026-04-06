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
    fontSize: '26px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },

  search: {
    flex: 1,
    minWidth: '180px',
    maxWidth: '320px',
    padding: '10px 14px',
    borderRadius: '20px',
    border: 'none',
    outline: 'none'
  },

  nav: {
    display: 'flex',
    gap: '24px',
    fontSize: '15px',
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },

  navItem: {
    cursor: 'pointer'
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