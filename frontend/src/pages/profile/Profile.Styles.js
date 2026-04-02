const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  disabledInput: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f3f4f6',
    color: '#666',
    fontSize: '14px'
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
  },
  dangerButton: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc2626',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '12px'
  },
  cancelButton: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#111827',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '12px'
  },
  dangerBox: {
    marginTop: '20px',
    padding: '16px',
    border: '1px solid #fecaca',
    backgroundColor: '#fef2f2',
    borderRadius: '10px'
  },
  dangerText: {
    color: '#991b1b',
    margin: 0
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}

export default styles