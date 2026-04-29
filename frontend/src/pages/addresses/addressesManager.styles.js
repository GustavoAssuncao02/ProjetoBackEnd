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
  danger: '#7B1D1D',
  warning: '#8A5A00',
  shadowMd: '0 4px 24px rgba(20,20,18,0.09)'
}

const inputBase = {
  fontFamily: t.fontBody,
  fontSize: '13px',
  color: t.text,
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: `1px solid ${t.border}`,
  borderRadius: 0,
  padding: '10px 0',
  outline: 'none',
  letterSpacing: '0.03em',
  width: '100%',
  boxSizing: 'border-box'
}

const buttonBase = {
  fontFamily: t.fontBody,
  fontSize: '12px',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  border: 'none',
  padding: '13px 18px',
  cursor: 'pointer'
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: t.bg,
    padding: '30px 20px 48px',
    fontFamily: t.fontBody
  },
  card: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: t.surface,
    padding: '52px 48px',
    boxShadow: t.shadowMd,
    boxSizing: 'border-box'
  },
  title: {
    fontFamily: t.fontDisplay,
    fontSize: '38px',
    fontWeight: '400',
    color: t.text,
    letterSpacing: '0.04em',
    margin: '0 0 34px',
    textAlign: 'center'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px 24px',
    marginBottom: '28px'
  },
  input: {
    ...inputBase
  },
  button: {
    ...buttonBase,
    backgroundColor: t.accent,
    color: '#FFFFFF'
  },
  yellowButton: {
    ...buttonBase,
    backgroundColor: t.warning,
    color: '#FFFFFF'
  },
  redButton: {
    ...buttonBase,
    backgroundColor: t.danger,
    color: '#FFFFFF'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    minWidth: '1060px',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    padding: '14px 12px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  td: {
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
    fontSize: '13px',
    padding: '14px 12px',
    verticalAlign: 'top'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  message: {
    color: t.muted,
    fontSize: '13px',
    letterSpacing: '0.02em',
    marginBottom: '18px',
    textAlign: 'center'
  },
  loginBox: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: t.surface,
    padding: '52px 48px',
    boxShadow: t.shadowMd,
    boxSizing: 'border-box',
    textAlign: 'center'
  }
}

export default styles
