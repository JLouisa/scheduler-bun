import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="h-16 flex justify-center items-center border-b-gray-200 shadow-md">
      <header className="w-full h-full flex justify-between items-center mx-4">
        <div>Gauchos Scheduler</div>
        <ul className="flex gap-4">
          <Link to="/scheduleboard">
            <li className="cursor-pointer">Schedule</li>
          </Link>
          <Link to="/login">
            <li className="cursor-pointer">Log in</li>
          </Link>
          <Link to="/admin">
            <li className="cursor-pointer">Admin</li>
          </Link>
        </ul>
      </header>
    </nav>
  );
};

export default Header;
