import brand from "../images/redux-logo.webp";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand-container">
        <img src={brand} alt="logo" />
      </div>
      <div className="footer-buttons-container"></div>
    </footer>
  );
};
