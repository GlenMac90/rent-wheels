import { ReactNode } from "react";

const ModalBackground = ({
  children,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
}) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-center overflow-auto bg-black/40 p-2 px-3 pt-48 dark:bg-black/30 lg:px-4"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
