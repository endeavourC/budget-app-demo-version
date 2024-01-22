"use client";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
}

export const MenuLink: React.FC<IProps> = ({ href, name }) => {
  const pathName = usePathname();

  const linkClasses = classNames({
    "mx-8 hover:text-black hover:font-semibold transition min-w-[80px] text-center":
      true,
    "text-primary": pathName !== href,
    "text-black font-semibold": pathName === href,
  });
  return (
    <Link className={linkClasses} key={href} href={href}>
      {name}
    </Link>
  );
};
