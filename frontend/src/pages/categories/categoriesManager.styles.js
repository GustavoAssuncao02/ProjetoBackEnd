const t = {
  fontDisplay: "'Cormorant Garamond', 'Georgia', serif",
  fontBody: "'Jost', 'Helvetica Neue', Arial, sans-serif",
  bg: '#F6F4F1',
  surface: '#FFFFFF',
  border: '#DDD9D3',
  text: '#141412',
  muted: '#6E6B66',
  accent: '#141412',
  danger: '#7B1D1D',
  warning: '#8A5A00',
  success: '#1A4A2E',
  dangerSoft: '#F9EEEE',
  successSoft: '#EDF6F0',
  shadowMd: '0 4px 24px rgba(20,20,18,0.09)'
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
    display: 'flex',
    gap: '18px',
    marginBottom: '28px',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '220px',
    fontFamily: t.fontBody,
    fontSize: '13px',
    color: t.text,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${t.border}`,
    borderRadius: 0,
    padding: '10px 0',
    outline: 'none',
    letterSpacing: '0.03em'
  },
  button: {
    ...buttonBase,
    backgroundColor: t.accent,
    color: '#FFFFFF'
  },
  greenButton: {
    ...buttonBase,
    backgroundColor: t.success,
    color: '#FFFFFF'
  },
  yellowButton: {
    ...buttonBase,
    backgroundColor: t.warning,
    color: '#FFFFFF'
  },
  activateButton: {
    ...buttonBase,
    backgroundColor: t.success,
    color: '#FFFFFF'
  },
  disableButton: {
    ...buttonBase,
    backgroundColor: t.danger,
    color: '#FFFFFF'
  },
  redButton: {
    ...buttonBase,
    backgroundColor: t.danger,
    color: '#FFFFFF'
  },
  table: {
    width: '100%',
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
    textTransform: 'uppercase'
  },
  td: {
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
    fontSize: '13px',
    padding: '14px 12px',
    verticalAlign: 'middle'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  badgeOn: {
    display: 'inline-block',
    padding: '6px 10px',
    backgroundColor: t.successSoft,
    color: t.success,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  },
  badgeOff: {
    display: 'inline-block',
    padding: '6px 10px',
    backgroundColor: t.dangerSoft,
    color: t.danger,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  },
  message: {
    color: t.muted,
    fontSize: '13px',
    letterSpacing: '0.02em',
    marginBottom: '18px',
    textAlign: 'center'
  }
}

export default styles
