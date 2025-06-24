const Footer = () => {
  return (
    <footer style={{ padding: "1rem", textAlign: "center", marginTop: "2rem", background: "#edf2f7", color: "#555" }}>
      <p>&copy; {new Date().getFullYear()} PrecisionMed. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
