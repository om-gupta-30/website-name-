export default function Custom404() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: '#f8f9fa',
      color: '#0d1321'
    }}>
      <h1 style={{ fontSize: '120px', margin: 0, color: '#1a2744' }}>404</h1>
      <p style={{ fontSize: '24px', marginTop: '16px' }}>Page Not Found</p>
      <a 
        href="/"
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          background: '#1a2744',
          color: '#f8f9fa',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        Go Home
      </a>
    </div>
  );
}
