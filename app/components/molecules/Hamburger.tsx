import { Sling } from "hamburger-react";
import { FC } from "react";

export const Hamburger: FC<{ setOpen: () => void }> = ({ setOpen }) => {
  return (
    <div className="md:hidden absolute top-0 right-0 z-30">
      <Sling onToggle={() => setOpen()} />
    </div>
  );
};
