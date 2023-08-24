import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-2 bg-green bg-gradient-to-b from-cyan  p-4  ${className} `}
    >
      {children}
    </div>
  );
};
