const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '30px'
  },

  card: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },

  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },

  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '28px',
    alignItems: 'start'
  },

  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    width: '100%'
  },

  fileGroup: {
    gridColumn: '1 / 2',
    gridRow: '2 / 3',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },

  formActions: {
    gridColumn: '1 / 2',
    gridRow: '3 / 4',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827'
  },

  imageWarning: {
    margin: 0,
    fontSize: '13px',
    color: '#555'
  },

  selectedImages: {
    margin: 0,
    fontSize: '13px',
    color: '#166534',
    fontWeight: '600'
  },

  button: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#fff',
    cursor: 'pointer',
    width: '100%'
  },

  yellowButton: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ca8a04',
    color: '#fff',
    cursor: 'pointer',
    width: '100%'
  },

  redButton: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc2626',
    color: '#fff',
    cursor: 'pointer',
    width: '100%'
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  th: {
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    padding: '12px'
  },

  td: {
    borderBottom: '1px solid #eee',
    padding: '12px',
    verticalAlign: 'middle'
  },

  groupRow: {
    backgroundColor: '#f8fafc'
  },

  groupCell: {
    borderBottom: '1px solid #dbe3ef',
    padding: 0
  },

  groupButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#111827',
    cursor: 'pointer',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: '32px 1fr auto',
    padding: '16px 12px',
    textAlign: 'left',
    width: '100%'
  },

  expandIcon: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: '8px',
    color: '#fff',
    display: 'flex',
    fontSize: '18px',
    fontWeight: '700',
    height: '32px',
    justifyContent: 'center',
    lineHeight: 1,
    width: '32px'
  },

  groupTitle: {
    fontSize: '16px',
    fontWeight: '700'
  },

  groupMeta: {
    color: '#475569',
    fontSize: '14px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },

  variantRow: {
    backgroundColor: '#fff'
  },

  variantTd: {
    backgroundColor: '#fff',
    paddingLeft: '18px'
  },

  emptyState: {
    color: '#64748b',
    fontWeight: '600',
    padding: '24px 12px',
    textAlign: 'center'
  },

  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    width: '200px'
  },

  message: {
    marginBottom: '15px',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  variantImage: {
    width: '72px',
    height: '72px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f3f3f3'
  },

  noImage: {
    fontSize: '13px',
    color: '#777'
  }
}

export default styles
