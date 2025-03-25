import React from 'react';

function MyApp({ Component, pageProps }) {
  // Global inline styles (applied to the entire app)
  const globalStyles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    a: {
      color: '#3182ce',
      textDecoration: 'none'
    },
    button: {
      cursor: 'pointer'
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: ${globalStyles.body.margin};
          padding: ${globalStyles.body.padding};
          font-family: ${globalStyles.body.fontFamily};
          background-color: ${globalStyles.body.backgroundColor};
          min-height: ${globalStyles.body.minHeight};
        }
        a {
          color: ${globalStyles.a.color};
          text-decoration: ${globalStyles.a.textDecoration};
        }
        button {
          cursor: ${globalStyles.button.cursor};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;