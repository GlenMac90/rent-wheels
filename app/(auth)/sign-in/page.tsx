import SignInForm from "@/components/form/SignInForm";
import { checkActiveSession } from "@/lib/actions/user.actions";

const SignIn = async () => {
  await checkActiveSession();

  return (
    <main className="auth-page-styles">
      <SignInForm />
    </main>
  );
};

export default SignIn;
