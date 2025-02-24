import React from 'react';

import cardPhone from '../../../assets/images/cardPhone.svg';
import cardSpeaker from '../../../assets/images/cardSpeaker.svg';
import PropTypes from 'prop-types';

const MetricsCard = ({ cards, onCardClick }) => {
  return (
    <div className="lg:flex gap-5 cursor-pointer mb-12 items-start md:grid md:grid-cols-2 md:gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white border-[1px] shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center ${card.textColor
            } ${card.borderColor}`}
          onClick={() => onCardClick(card)}
        >
          <h1 className="text-2xl font-bold">{card.value}</h1>
          <p className="text-[#030714]">{card.label}</p>
          <p className={`text-xs  ${card.text1Color}`}>{card.text1}</p>
          <div className="flex justify-between gap-6">
            <p className={`text-xs flex items-center gap-1 ${card.text2Color}`}>
              <img src={cardPhone} alt="Phone Icon" className="w-4 h-4" />
              {card.text2}
            </p>
            <p className={`text-xs flex items-center gap-1 ${card.text3Color}`}>
              <img src={cardSpeaker} alt="Speaker Icon" className="w-4 h-4" />
              {card.text3}
            </p>
          </div>

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
      text1: PropTypes.string.isRequired,
      text2: PropTypes.string.isRequired,
      text3: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      text1Color: PropTypes.string.isRequired,
      text2Color: PropTypes.string.isRequired,
      text3Color: PropTypes.string.isRequired,

      borderColor: PropTypes.string.isRequired,
      route: PropTypes.string,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default MetricsCard;
