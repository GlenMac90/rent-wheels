const Checkout = async ({
  searchParams,
}: {
  searchParams: {
    success: boolean;
  };
}) => {
  console.log(searchParams.success);
  return (
    <main className="page-styles">
      <h1>Checkout</h1>
      <p>
        {searchParams.success
          ? "Thank you for your purchase!"
          : "Your purchase was unsuccessful."}
      </p>
    </main>
  );
};

export default Checkout;
