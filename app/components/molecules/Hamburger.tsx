import { Sling } from "hamburger-react";
import { FC } from "react";

export const Hamburger: FC<{ setOpen: () => void }> = ({ setOpen }) => {
  return (
    <div className="absolute right-0 top-0 z-50 md:hidden">
      <Sling color="white" onToggle={() => setOpen()} />
    </div>
  );
};
