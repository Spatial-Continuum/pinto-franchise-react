import React from 'react';
import PropTypes from 'prop-types';

const MetricsCard = ({ cards , onCardClick }) => {
  return (
    <div className="lg:flex gap-5  mb-12 items-start md:grid md:grid-cols-2 md:gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white border-[1px] shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center ${
            card.textColor
          } ${card.borderColor}`}
          onClick={()=>onCardClick(card)}
        >
          <h1 className="text-2xl font-bold">{card.value}</h1>
          <p className="text-[#030714]">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

MetricsCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      borderColor: PropTypes.string.isRequired,
      route: PropTypes.string,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default MetricsCard;
