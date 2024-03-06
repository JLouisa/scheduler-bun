import { Link } from "react-router-dom";
import bearStore from "@/lib/bearStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAdmin, setIsAdmin } = bearStore();
  const navigate = useNavigate();

  const logOut = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/login");
  };

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
          {isAdmin && (
            <>
              <Link to="/rawweek">
                <li className="cursor-pointer">Raw Week</li>
              </Link>
              <Link to="/dashboard">
                <li className="cursor-pointer">Dashboard</li>
              </Link>
              <li className="cursor-pointer" onClick={logOut}>
                Log out
              </li>
            </>
          )}
          {!isAdmin && (
            <>
              <Link to="/login">
                <li className="cursor-pointer">Log in</li>
              </Link>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
};

export default Header;
