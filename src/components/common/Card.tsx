import React from "react";
import classNames from "classnames";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

const Card: React.FC<CardProps> = ({
  className,
  hover = false,
  children,
  onClick,
  ...rest
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
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
