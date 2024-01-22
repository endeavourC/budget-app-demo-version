import React from "react";
import { MenuLink } from "./MenuLink";

const menuLinks = [
  { name: "Overview", href: "/" },
  { name: "Finance", href: "/finance" },
  { name: "Events", href: "/events" },
];

export const Menu = () => {
  return (
    <nav className="flex items-center justify-start ml-auto">
      {menuLinks.map((link) => (
        <MenuLink href={link.href} name={link.name} key={link.href} />
      ))}
    </nav>
  );
};
