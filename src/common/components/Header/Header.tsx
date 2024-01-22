import Link from "next/link";
import { Menu } from "./components/Menu";
import { MyAccountHeading } from "./components/MyAccountHeading";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-start mb-32">
      <Link className="text-3xl font-semibold" href="/">
        BudgetApp
      </Link>
      <Menu />
      <MyAccountHeading />
    </header>
  );
};
