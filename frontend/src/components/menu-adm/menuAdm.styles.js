const t = {
  fontBody: "'Jost', 'Helvetica Neue', Arial, sans-serif",
  surface: '#FFFFFF',
  border: '#DDD9D3',
  text: '#141412',
  muted: '#6E6B66',
  shadowMd: '0 4px 24px rgba(20,20,18,0.09)'
}

const styles = {
  mainHeader: {
    margin: '-30px -20px 18px',
    boxShadow: t.shadowMd,
    overflow: 'hidden'
  },

  nav: {
    maxWidth: '1200px',
    margin: '0 auto 18px',
    backgroundColor: t.surface,
    boxShadow: t.shadowMd,
    padding: '18px 22px',
    overflowX: 'auto',
    boxSizing: 'border-box',
    fontFamily: t.fontBody
  },

  list: {
    display: 'flex',
    gap: '22px',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },

  link: {
    display: 'block',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${t.border}`,
    padding: '8px 0',
    color: t.text,
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },

  mutedLink: {
    color: t.muted
  }
}

export default styles
