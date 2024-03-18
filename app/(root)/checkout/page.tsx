import { validateUserSession } from "@/lib/actions/user.actions";

const Checkout = async () => {
  await validateUserSession();

  return <div>Checkout</div>;
};

export default Checkout;
