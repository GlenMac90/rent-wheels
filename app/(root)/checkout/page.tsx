const Checkout = async ({
  params,
}: {
  params: {
    success: string;
  };
}) => {
  console.log(params.success);
  return (
    <main className="page-styles">
      <h1>Checkout</h1>
    </main>
  );
};

export default Checkout;
