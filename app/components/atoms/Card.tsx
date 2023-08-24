import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`bg-cyan flex flex-col p-4 gap-2 ${className}`}>
      {children}
    </div>
  );
};
