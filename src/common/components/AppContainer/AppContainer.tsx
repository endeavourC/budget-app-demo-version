import React from "react";
import { AppContainerContent } from "./AppContainerContent";
import { AppContainerAside } from "./AppContainerAside";

interface IProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: IProps) => {
  return <section className="appContainer">{children}</section>;
};

AppContainer.Content = AppContainerContent;
AppContainer.Aside = AppContainerAside;

export { AppContainer };
