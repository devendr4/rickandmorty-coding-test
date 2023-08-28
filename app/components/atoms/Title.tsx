import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="mb-2 text-center font-schwifty text-5xl text-cyan">
      {children}
    </h1>
  );
};
