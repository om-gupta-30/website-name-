function Error({ statusCode }) {
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
      <h1 style={{ fontSize: '72px', margin: 0, color: '#1a2744' }}>
        {statusCode || 'Error'}
      </h1>
      <p style={{ fontSize: '20px', marginTop: '16px' }}>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
