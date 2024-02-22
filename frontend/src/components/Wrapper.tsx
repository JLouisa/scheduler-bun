import React, { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ children }) => {
  return <div className="max-w-screen-xl mx-auto px-4">{children}</div>;
};

export default MaxWidthWrapper;
