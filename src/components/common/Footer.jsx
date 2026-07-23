export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-branding">
          <h3>Nexus Store</h3>
          <p>Premium, hand-crafted essentials designed for modern lifestyles.</p>
        </div>
        <div className="footer-separator"></div>
        <p className="copyright">© {new Date().getFullYear()} Nexus Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
