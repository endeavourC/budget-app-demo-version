import React from "react";
import { Header } from "..";
interface IProps {
  children: React.ReactNode;
}
export const AppContainerContent: React.FC<IProps> = ({ children }) => {
  return (
    <div className="appContainer__content">
      <Header />
      {children}
    </div>
  );
};
