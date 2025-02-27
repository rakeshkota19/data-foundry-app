import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";

const Login = () => {
  const authStatus = useAuthenticator((auth) => [auth.authStatus]);
  const navigate = useNavigate();
  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/");
    }
  }, []);

  return <Authenticator />;
};

export default Login;
