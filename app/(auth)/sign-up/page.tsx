import SignUpForm from "@/components/form/SignUpForm";
import { checkActiveSession } from "@/lib/actions/user.actions";

const SignUp = async () => {
  await checkActiveSession();
  return (
    <main className="auth-page-styles">
      <SignUpForm />
    </main>
  );
};

export default SignUp;
