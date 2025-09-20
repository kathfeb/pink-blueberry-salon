import React from "react";
import classNames from "classnames";

interface CardProps {
  className?: string;
  hover?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  className,
  hover = false,
  children,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "bg-white rounded-xl p-6 shadow-card transition-all duration-300",
        {
          "hover:shadow-card-hover hover:-translate-y-2 cursor-pointer": hover,
          "cursor-pointer": onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
