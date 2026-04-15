const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '30px'
  },
  card: {
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#000'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '14px',
    marginBottom: '28px',
    alignItems: 'center'
  },
  input: {
    padding: '14px 12px',
    borderRadius: '10px',
    border: '1px solid #cfcfcf',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#fff'
  },
  buttonRow: {
    gridColumn: '1 / -1',
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  filtersRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr auto',
    gap: '12px',
    marginBottom: '22px',
    alignItems: 'center'
  },
  button: {
    padding: '12px 18px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#0f172a',
    color: '#fff',
    cursor: 'pointer',
    minWidth: '180px',
    fontSize: '1rem'
  },
  yellowButton: {
    padding: '12px 18px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#ca8a04',
    color: '#fff',
    cursor: 'pointer',
    minWidth: '140px',
    fontSize: '1rem'
  },
  redButton: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#dc2626',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  clearFilterButton: {
    padding: '12px 18px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#475569',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    whiteSpace: 'nowrap'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    padding: '14px 10px',
    fontWeight: '700',
    color: '#000'
  },
  sortableTh: {
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    padding: '14px 10px',
    fontWeight: '700',
    color: '#000',
    cursor: 'pointer',
    userSelect: 'none'
  },
  thContent: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  sortIcon: {
    fontSize: '0.9rem',
    opacity: 0.75
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '14px 10px',
    verticalAlign: 'middle'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  message: {
    marginBottom: '16px',
    fontWeight: '600',
    textAlign: 'center'
  },
  emptyState: {
    textAlign: 'center',
    padding: '20px',
    color: '#666'
  },
  grayButton: {
  padding: '10px 14px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#475569',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem'
},greenButton: {
  padding: '10px 14px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#16a34a',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem'
},
  
}


export default styles