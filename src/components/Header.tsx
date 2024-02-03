import brand from "../images/redux-logo.webp";

export const Header = () => {
  return (
    <header className="header">
      <div className="brand-container">
        <img src={brand} alt="logo" />
        <span>DASHBOARD-REDUX</span>
      </div>
    </header>
  );
};
