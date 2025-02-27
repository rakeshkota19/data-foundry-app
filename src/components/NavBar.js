import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const { authStatus, signOut } = useAuthenticator((authData) => [
    authData.authStatus,
  ]);

  useEffect(() => {
    if (authStatus !== "configuring") {
      setIsLoggedUser(authStatus === "authenticated");
    }
  }, [authStatus]);

  const signInHandler = () => {
    navigate("/login");
  };

  return (
    <div className="nav-bar-container">
      <div className="img-container">{/* <img src="" alt="image" /> */}</div>
      <div className="nav-bar">
        {isLoggedUser ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/create">Create Service Request</NavLink>
            <NavLink onClick={signOut}>Sign Out</NavLink>
          </>
        ) : (
          <button onClick={signInHandler}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
//  const { user, signOut } = useAuthenticator((context) => [context.user]);
