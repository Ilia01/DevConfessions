import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { type SignupFormData } from "../types/FormData";
import { SignupForm } from "../components/SignupForm";
import { AuthFormCardWrapper } from "../components/AuthCardWrapper";

export default function SignupPage() {
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsPending(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        data
      );
      login(res.data.token);
      toast.success("Signed up successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.status === 400) {
          toast.error("Username or email already exists!");
        } else {
          toast.error("Something went wrong. Try again!");
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthFormCardWrapper>
      <SignupForm handleSubmit={handleSignup} isPending={isPending} />
    </AuthFormCardWrapper>
  );
}
