import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 p-4  ${className} bg-cyan`}>
      {children}
    </div>
  );
};
