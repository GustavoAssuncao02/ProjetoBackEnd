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
  success: '#1A4A2E',
  dangerSoft: '#F9EEEE',
  successSoft: '#EDF6F0',
  shadowMd: '0 4px 24px rgba(20,20,18,0.09)'
}

const buttonBase = {
  border: 'none',
  cursor: 'pointer',
  fontFamily: t.fontBody,
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.08em',
  padding: '12px 16px',
  textTransform: 'uppercase'
}

const styles = {
  container: {
    backgroundColor: t.bg,
    fontFamily: t.fontBody,
    minHeight: '100vh',
    padding: '30px 20px 48px'
  },

  card: {
    backgroundColor: t.surface,
    boxShadow: t.shadowMd,
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '1200px',
    padding: '52px 48px',
    width: '100%'
  },

  title: {
    color: t.text,
    fontFamily: t.fontDisplay,
    fontSize: '38px',
    fontWeight: '400',
    letterSpacing: '0.04em',
    margin: '0 0 14px',
    textAlign: 'center'
  },

  subtitle: {
    color: t.muted,
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '0 auto 34px',
    maxWidth: '680px',
    textAlign: 'center'
  },

  panel: {
    borderTop: `1px solid ${t.border}`,
    padding: '28px 0'
  },

  panelHeader: {
    alignItems: 'end',
    display: 'flex',
    gap: '18px',
    justifyContent: 'space-between',
    marginBottom: '18px'
  },

  panelTitle: {
    color: t.text,
    fontFamily: t.fontDisplay,
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '0.03em',
    margin: 0
  },

  panelText: {
    color: t.muted,
    fontSize: '13px',
    lineHeight: 1.5,
    margin: '8px 0 0'
  },

  sectionList: {
    display: 'grid',
    gap: '10px'
  },

  sectionRow: {
    alignItems: 'center',
    backgroundColor: t.surfaceSoft,
    border: `1px solid ${t.border}`,
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: '42px minmax(0, 1fr) auto auto',
    padding: '14px'
  },

  orderNumber: {
    alignItems: 'center',
    backgroundColor: t.text,
    color: '#FFFFFF',
    display: 'flex',
    fontSize: '12px',
    fontWeight: '700',
    height: '30px',
    justifyContent: 'center',
    width: '30px'
  },

  sectionName: {
    color: t.text,
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    margin: 0,
    textTransform: 'uppercase'
  },

  checkboxLabel: {
    alignItems: 'center',
    color: t.text,
    display: 'flex',
    fontSize: '12px',
    gap: '8px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },

  checkbox: {
    accentColor: t.text,
    height: '16px',
    width: '16px'
  },

  rowActions: {
    display: 'flex',
    gap: '8px'
  },

  smallButton: {
    ...buttonBase,
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    color: t.text,
    padding: '9px 12px'
  },

  disabledButton: {
    cursor: 'not-allowed',
    opacity: 0.45
  },

  slotsGrid: {
    display: 'grid',
    gap: '18px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
  },

  slotBox: {
    backgroundColor: t.surfaceSoft,
    border: `1px solid ${t.border}`,
    display: 'grid',
    gap: '16px',
    padding: '18px'
  },

  slotHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px'
  },

  slotTitle: {
    color: t.text,
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    margin: 0,
    textTransform: 'uppercase'
  },

  field: {
    display: 'grid',
    gap: '8px'
  },

  label: {
    color: t.muted,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },

  input: {
    backgroundColor: t.surface,
    border: 'none',
    borderBottom: `1px solid ${t.border}`,
    borderRadius: 0,
    boxSizing: 'border-box',
    color: t.text,
    fontFamily: t.fontBody,
    fontSize: '13px',
    outline: 'none',
    padding: '11px 10px',
    width: '100%'
  },

  imageGrid: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
    maxHeight: '260px',
    overflowY: 'auto',
    paddingRight: '4px'
  },

  imageOption: {
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    color: t.text,
    cursor: 'pointer',
    display: 'grid',
    gap: '6px',
    padding: '7px',
    textAlign: 'left'
  },

  imageOptionSelected: {
    borderColor: t.text,
    boxShadow: `inset 0 0 0 2px ${t.text}`
  },

  imageThumb: {
    aspectRatio: '1 / 1',
    backgroundColor: '#EFECE7',
    display: 'block',
    objectFit: 'cover',
    width: '100%'
  },

  imageName: {
    color: t.muted,
    fontSize: '11px',
    lineHeight: 1.25,
    minHeight: '28px',
    overflow: 'hidden'
  },

  emptyState: {
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    color: t.muted,
    fontSize: '13px',
    lineHeight: 1.5,
    padding: '16px',
    textAlign: 'center'
  },

  footerActions: {
    borderTop: `1px solid ${t.border}`,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
    paddingTop: '24px'
  },

  primaryButton: {
    ...buttonBase,
    backgroundColor: t.accent,
    color: '#FFFFFF'
  },

  secondaryButton: {
    ...buttonBase,
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    color: t.text
  },

  dangerButton: {
    ...buttonBase,
    backgroundColor: t.danger,
    color: '#FFFFFF'
  },

  message: {
    border: `1px solid ${t.border}`,
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '0.02em',
    margin: '0 0 18px',
    padding: '14px 16px',
    textAlign: 'center'
  },

  messageSuccess: {
    backgroundColor: t.successSoft,
    borderColor: 'rgba(26, 74, 46, 0.25)',
    color: t.success
  },

  messageError: {
    backgroundColor: t.dangerSoft,
    borderColor: 'rgba(123, 29, 29, 0.25)',
    color: t.danger
  }
}

export default styles
