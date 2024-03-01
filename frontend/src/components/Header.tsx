import { Link } from "react-router-dom";
import bearStore from "@/lib/bearStore";

const Header = () => {
  const { isAdmin } = bearStore();
  return (
    <nav className="h-16 flex justify-center items-center border-b-gray-200 shadow-md">
      <header className="w-full h-full flex justify-between items-center mx-4">
        <div>Gauchos Scheduler</div>
        <ul className="flex gap-4">
          <Link to="/currentweek">
            <li className="cursor-pointer">This Week</li>
          </Link>
          <Link to="/nextweek">
            <li className="cursor-pointer">Next Week</li>
          </Link>
          <Link to="/rawweek">
            <li className="cursor-pointer">Raw Week</li>
          </Link>
          <Link to="/login">
            <li className="cursor-pointer">Log in</li>
          </Link>
          <Link to="/dashboard">
            <li className="cursor-pointer">Dashboard</li>
          </Link>
          <Link to="/pdf">
            <li className="cursor-pointer">PDF</li>
          </Link>
        </ul>
      </header>
    </nav>
  );
};

export default Header;
