const FooterComponent = () => {
  const FOOTER_HEIGHT_PX = '256px';

  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        height: FOOTER_HEIGHT_PX,
        width: '100%',
        background: 'url(/images/logo/JP-logos-footer.png)',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          color: 'white',
          paddingTop: '116px',
        }}
      >
        Jon Peppinck &copy; 2021-{new Date().getFullYear()}.
      </div>
    </footer>
  );
};

export default FooterComponent;
