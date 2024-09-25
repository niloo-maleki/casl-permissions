import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton, Paragraph, TextField, Title } from "@shatel/ui-kit";
import { AuthContext } from "@src/context/AuthContext";
import { getPermission } from "@src/api/api";


const LoginPage = () => {
  const { setRole, setPermissions } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()
  }, [])
  
  const fetchLoginData = (async () => {
    try {
      const { data, message } = await getPermission(username)
      if (data) {
        setPermissions(data.permissions)
        localStorage.setItem('token', data.token)

      } else {
        setLoginError(message)
        return
      }

      setRole(username);
      navigate("/dashboard");
      setLoading(false)

    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    fetchLoginData()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cta-hover-secondary">
      <div className="flex flex-col gap-medium bg-main-white p-xlarge rounded-medium shadow-lg w-full max-w-md">
        <Title variant="h2" className="text-center">
          Login CRM
        </Title>
        {loginError && (
          <Paragraph variant="p" className="mb-4 text-action-fail text-center">
            {loginError}
          </Paragraph>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="نام کاربری"
            ></TextField>
          </div>
          <div>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="رمز عبور"
            ></TextField>
          </div>
          <LoadingButton isLoading={loading}>ورود</LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
