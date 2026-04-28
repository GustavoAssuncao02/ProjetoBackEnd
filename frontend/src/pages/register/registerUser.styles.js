const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '22px 80px',
    boxSizing: 'border-box'
  },

  card: {
    width: '100%',
    maxWidth: '760px',
    minHeight: '520px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '26px 28px',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '11px'
  },

  title: {
    margin: '0 0 16px',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '700',
    color: '#000'
  },

  input: {
    width: '100%',
    height: '40px',
    border: '1px solid #c9c9c9',
    borderRadius: '6px',
    padding: '0 11px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#000'
  },

  button: {
    width: '100%',
    height: '40px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '2px'
  },

  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '14px',
    textAlign: 'center'
  },

  success: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '14px',
    textAlign: 'center'
  },

  loginRedirect: {
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#333'
  },

  loginLink: {
    color: '#000',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
}

export default styles