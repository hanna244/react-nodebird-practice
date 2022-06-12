import react from "react";

const AppLayout = ({ children }) => {
  return (
    <div>
      div
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
