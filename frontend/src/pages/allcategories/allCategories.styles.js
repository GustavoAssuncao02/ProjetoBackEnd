const t = {
  fontDisplay: "'Cormorant Garamond', 'Georgia', serif",
  fontBody: "'Jost', 'Helvetica Neue', Arial, sans-serif",
  bg: '#F6F4F1',
  surface: '#FFFFFF',
  surfaceSoft: '#F9F8F6',
  border: '#DDD9D3',
  text: '#141412',
  muted: '#6E6B66',
  accent: '#141412',
  shadowMd: '0 4px 24px rgba(20,20,18,0.09)'
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: t.bg,
    color: t.text,
    fontFamily: t.fontBody
  },

  content: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '42px 20px 56px',
    width: '100%'
  },

  header: {
    backgroundColor: t.surface,
    boxShadow: t.shadowMd,
    boxSizing: 'border-box',
    marginBottom: '24px',
    padding: '48px 42px',
    textAlign: 'center'
  },

  kicker: {
    color: t.muted,
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },

  title: {
    color: t.text,
    fontFamily: t.fontDisplay,
    fontSize: '38px',
    fontWeight: '400',
    letterSpacing: '0.04em',
    margin: '0 0 12px'
  },

  subtitle: {
    color: t.muted,
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '0 auto',
    maxWidth: '560px'
  },

  grid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
  },

  categoryLink: {
    alignItems: 'start',
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    boxSizing: 'border-box',
    color: t.text,
    display: 'grid',
    gap: '10px 18px',
    gridTemplateColumns: 'minmax(0, 1fr)',
    minHeight: '132px',
    padding: '22px',
    textDecoration: 'none'
  },

  categoryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    minWidth: 0
  },

  categoryName: {
    color: t.text,
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    lineHeight: 1.25,
    overflowWrap: 'break-word',
    textTransform: 'uppercase'
  },

  categoryMeta: {
    color: t.muted,
    fontSize: '13px'
  },

  categoryAction: {
    borderBottom: `1px solid ${t.text}`,
    color: t.text,
    fontSize: '12px',
    fontWeight: '600',
    justifySelf: 'start',
    letterSpacing: '0.08em',
    paddingBottom: '4px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },

  message: {
    backgroundColor: t.surface,
    color: t.muted,
    fontSize: '13px',
    letterSpacing: '0.02em',
    margin: '0 0 18px',
    padding: '18px',
    textAlign: 'center'
  },

  emptyState: {
    backgroundColor: t.surface,
    color: t.muted,
    fontSize: '13px',
    padding: '28px 18px',
    textAlign: 'center'
  }
}

export default styles
