import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormData } from "../types/FormData";
import { Form } from "./Form";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas";
import { UsernameField } from "./UsernameField";

export const SignupForm = ({
  handleSubmit: onSubmit,
  isPending,
}: {
  handleSubmit: SubmitHandler<SignupFormData>;
  isPending: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      actionText="Signup"
      loadingText="Signing up..."
    >
      <UsernameField register={register} errors={errors} />
      <EmailField register={register} errors={errors} />
      <PasswordField register={register} errors={errors} />
    </Form>
  );
};
