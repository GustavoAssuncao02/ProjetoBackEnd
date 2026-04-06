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
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
    marginBottom: '20px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#fff',
    cursor: 'pointer'
  },
  yellowButton: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ca8a04',
    color: '#fff',
    cursor: 'pointer'
  },
  redButton: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc2626',
    color: '#fff',
    cursor: 'pointer'
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
    verticalAlign: 'top'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  message: {
    marginBottom: '15px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginBox: {
    maxWidth: '500px',
    margin: '80px auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }
}

export default styles