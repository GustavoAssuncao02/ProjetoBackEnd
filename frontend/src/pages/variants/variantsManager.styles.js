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
  success: '#1A4A2E',
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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '18px 24px',
    marginBottom: '34px',
    alignItems: 'start'
  },

  input: {
    ...inputBase
  },

  fileGroup: {
    gridColumn: '1 / 3',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  formActions: {
    gridColumn: '1 / 2',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  label: {
    color: t.text,
    fontFamily: t.fontBody,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },

  imageWarning: {
    color: t.muted,
    fontSize: '13px',
    lineHeight: 1.5,
    margin: 0
  },

  selectedImages: {
    color: t.success,
    fontSize: '13px',
    fontWeight: '600',
    margin: 0
  },

  button: {
    ...buttonBase,
    backgroundColor: t.accent,
    color: '#FFFFFF',
    width: '100%'
  },

  yellowButton: {
    ...buttonBase,
    backgroundColor: t.warning,
    color: '#FFFFFF',
    width: '100%'
  },

  redButton: {
    ...buttonBase,
    backgroundColor: t.danger,
    color: '#FFFFFF',
    width: '100%'
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    minWidth: '980px',
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
    verticalAlign: 'middle'
  },

  groupRow: {
    backgroundColor: t.surfaceSoft
  },

  groupCell: {
    borderBottom: `1px solid ${t.border}`,
    padding: 0
  },

  groupButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: t.text,
    cursor: 'pointer',
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: '32px 1fr auto',
    padding: '17px 12px',
    textAlign: 'left',
    width: '100%'
  },

  expandIcon: {
    alignItems: 'center',
    backgroundColor: t.accent,
    color: '#FFFFFF',
    display: 'flex',
    fontSize: '18px',
    fontWeight: '700',
    height: '32px',
    justifyContent: 'center',
    lineHeight: 1,
    width: '32px'
  },

  groupTitle: {
    color: t.text,
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  },

  groupMeta: {
    color: t.muted,
    fontSize: '13px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },

  variantRow: {
    backgroundColor: t.surface
  },

  variantTd: {
    backgroundColor: t.surface,
    paddingLeft: '18px'
  },

  emptyState: {
    backgroundColor: t.surfaceSoft,
    color: t.muted,
    fontSize: '13px',
    padding: '24px 12px',
    textAlign: 'center'
  },

  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    width: '190px'
  },

  message: {
    color: t.muted,
    fontSize: '13px',
    letterSpacing: '0.02em',
    marginBottom: '18px',
    textAlign: 'center'
  },

  variantImage: {
    width: '72px',
    height: '72px',
    objectFit: 'cover',
    border: `1px solid ${t.border}`,
    backgroundColor: t.surfaceSoft
  },

  noImage: {
    color: t.muted,
    fontSize: '13px'
  }
}

export default styles
