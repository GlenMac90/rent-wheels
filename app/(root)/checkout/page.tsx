const Checkout = async ({
  searchParams,
}: {
  searchParams: {
    success: string;
  };
}) => {
  console.log(searchParams.success);
  return (
    <main className="page-styles">
      <h1>Checkout</h1>
    </main>
  );
};

export default Checkout;
