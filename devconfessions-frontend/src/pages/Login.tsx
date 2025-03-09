import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { LoginFormData } from "../types/FormData";
import { AuthFormCardWrapper } from "../components/AuthCardWrapper";

export default function LoginPage() {
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsPending(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );

      login(res.data.token);
      navigate("/");
      toast.success("Logged in successfully!", {
        style: { background: "#34D399", color: "#fff" },
      });
    } catch (error) {
      setIsPending(false);

      if (!axios.isAxiosError(error)) {
        toast.error("An unexpected error occurred.", {
          style: { background: "#F56565", color: "#fff" },
        });
        return;
      }

      const { response } = error;

      if (!response) {
        toast.error("Network error. Please check your connection.", {
          style: { background: "#F56565", color: "#fff" },
        });
        return;
      }

      toast.error(response.data?.error || "Something went wrong. Try again!", {
        style: { background: "#F56565", color: "#fff" },
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthFormCardWrapper>
      <LoginForm handleSubmit={handleLogin} isPending={isPending} />
    </AuthFormCardWrapper>
  );
}
