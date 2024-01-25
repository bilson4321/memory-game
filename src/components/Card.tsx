import { useEffect, useMemo, useState } from "react";

interface CardProps {
  title: string;
  isFlipped: boolean;
  isInactive: boolean;
  onClick: () => void;
}

const Card = (props: CardProps) => {
  const { isFlipped, onClick, isInactive } = props;
  
  const handleClick = () => {
    !isInactive && !isFlipped && onClick();
  };

  const cardStyle = useMemo(() => {
    return {
      transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
      cursor: isInactive ? "default" : "pointer",
      transition: "transform 0.9s ease",
    };
  }, [isFlipped, isInactive]);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isFlipped) {
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    } else {
      setIsVisible(false);
    }
  }, [isFlipped]);

  return (
    <div
      className="w-full h-28 rounded-md shadow-md cursor-pointer"
      style={cardStyle}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center h-full bg-blue-500 rounded-md shadow-md">
        <h2
          className="text-4xl text-white"
          style={{
            visibility: isVisible ? "visible" : "hidden",
          }}
        >
          {props.title}
        </h2>
      </div>
    </div>
  );
};

export default Card;
