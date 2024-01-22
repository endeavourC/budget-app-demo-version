import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const AppContainerAside: React.FC<IProps> = ({ children }) => {
  return <div className="appContainer__aside">{children}</div>;
};
