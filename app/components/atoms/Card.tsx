import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`to-dark-cyan flex flex-col gap-2  rounded bg-gradient-to-r from-cyan p-4 opacity-90  ${className} `}
    >
      {children}
    </div>
  );
};
