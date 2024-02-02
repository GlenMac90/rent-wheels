const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="md:flex-between text-gray-800_white semibold-12 md:semibold-16 bottom-0 flex w-full flex-col gap-8 border-t border-t-blue-50/40 px-6 py-5 dark:border-t-gray-850 md:flex-row-reverse md:py-10">
      <div className="flex w-full justify-between gap-6 md:w-auto ">
        <span>Privacy & Policy</span>
        <span>Terms & Conditions</span>
      </div>
      <span>©{currentYear} MORENT. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
