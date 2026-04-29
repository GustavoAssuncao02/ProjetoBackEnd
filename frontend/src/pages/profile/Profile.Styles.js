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
  dangerSoft: '#F9EEEE',
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

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: t.bg,
    padding: '30px 20px 48px',
    fontFamily: t.fontBody
  },
  card: {
    width: '100%',
    maxWidth: '1200px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px 24px'
  },
  input: {
    ...inputBase
  },
  disabledInput: {
    ...inputBase,
    color: t.muted,
    backgroundColor: t.surfaceSoft,
    borderBottom: `1px solid ${t.border}`,
    padding: '10px 12px'
  },
  button: {
    gridColumn: '1 / -1',
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: t.accent,
    border: 'none',
    padding: '14px 0',
    cursor: 'pointer',
    marginTop: '8px',
    width: '100%'
  },
  dangerButton: {
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: t.danger,
    border: 'none',
    padding: '13px 18px',
    cursor: 'pointer',
    marginTop: '18px'
  },
  logoutButton: {
    display: 'block',
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: t.text,
    backgroundColor: 'transparent',
    border: `1px solid ${t.border}`,
    padding: '13px 18px',
    cursor: 'pointer',
    marginTop: '18px'
  },
  cancelButton: {
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: t.text,
    backgroundColor: 'transparent',
    border: `1px solid ${t.border}`,
    padding: '13px 18px',
    cursor: 'pointer',
    marginTop: '18px'
  },
  dangerBox: {
    marginTop: '24px',
    padding: '18px',
    border: `1px solid ${t.danger}`,
    backgroundColor: t.dangerSoft
  },
  dangerText: {
    color: t.danger,
    fontFamily: t.fontBody,
    fontSize: '13px',
    lineHeight: 1.6,
    margin: 0
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  message: {
    fontFamily: t.fontBody,
    fontSize: '13px',
    color: t.muted,
    textAlign: 'center',
    margin: '18px 0 0',
    letterSpacing: '0.02em'
  }
}

export default styles
