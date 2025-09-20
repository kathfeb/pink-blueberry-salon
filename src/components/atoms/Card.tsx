import React from "react";
import classNames from "classnames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "bg-white rounded-xl p-6 shadow-card",
        hover &&
          "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
