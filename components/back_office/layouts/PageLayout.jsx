import layoutStyle from "../../../styles/back_office/Layouts/PageLayout.module.css";

const PageLayout = ({ title, children }) => {
  return (
    <div className={layoutStyle.pageLayoutContainer}>
      <div>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
