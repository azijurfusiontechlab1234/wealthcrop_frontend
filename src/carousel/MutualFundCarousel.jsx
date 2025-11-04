import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { getApi } from '../api/api';

function MutualFundCarousel() {
  const [selectedFund, setSelectedFund] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isScrolling, setIsScrolling] = useState(true);
  const modalRef = useRef();

  const url1 = `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_MUTUAL_FUND}`;
  const { data } = useQuery({
  queryKey: ["MUTUAL_FUND_DATA"],
  queryFn: () => getApi(url1),
});


  const getColor = (isUp) => (isUp ? 'text-green-600' : 'text-red-600');
  const getArrow = (isUp) =>
    isUp ? (
      <MdOutlineArrowDropUp className="text-lg inline" />
    ) : (
      <MdOutlineArrowDropDown className="text-lg inline" />
    );

//   const handleItemClick = (fund, index) => {
//     const item = document.getElementById(`fund-item-${index}`);
//     const rect = item.getBoundingClientRect();

//     const modalHeight = 200;
//     const modalWidth = 300;

//     let topPosition = rect.bottom + window.scrollY;
//     let leftPosition = rect.left + window.scrollX;

//     if (topPosition + modalHeight > window.scrollY + window.innerHeight) {
//       topPosition = rect.top + window.scrollY - modalHeight;
//     }

//     if (leftPosition + modalWidth > window.scrollX + window.innerWidth) {
//       leftPosition = window.scrollX + window.innerWidth - modalWidth - 10;
//     }

//     setModalPosition({ top: topPosition + 10, left: leftPosition });
//     setSelectedFund(fund);
//     setShowModal(true);
//     setIsScrolling(false);
//   };
const handleItemClick = (fund, index) => {
  const item = document.getElementById(`fund-item-${index}`);
  const rect = item.getBoundingClientRect();

  const modalHeight = 200;
  const modalWidth = 300;

  let topPosition = rect.bottom + window.scrollY;
  let leftPosition = rect.left + window.scrollX;

  // ✅ Prevent modal from going below viewport
  if (topPosition + modalHeight > window.scrollY + window.innerHeight) {
    topPosition = rect.top + window.scrollY - modalHeight;
  }

  // ✅ Prevent modal from overflowing right side
  if (leftPosition + modalWidth > window.scrollX + window.innerWidth) {
    leftPosition = window.scrollX + window.innerWidth - modalWidth - 10;
  }

  // ✅ Prevent modal from overflowing left side
  if (leftPosition < 10) {
    leftPosition = 10;
  }

  setModalPosition({ top: topPosition + 10, left: leftPosition });
  setSelectedFund(fund);
  setShowModal(true);
  setIsScrolling(false);
};


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
        setIsScrolling(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="left-0 w-full bg-white shadow-md overflow-hidden border-b border-gray-300"
      style={{ height: '40px' }}
    >
      <div
        className="flex whitespace-nowrap animate-marquee items-center h-full"
        style={{
          animationPlayState: isScrolling ? 'running' : 'paused',
        }}
      >
        {data?.data?.["10 yr Government Bond"]?.map((fund, index) => (
          <div
            key={index}
            id={`fund-item-${index}`}
            className="flex items-center px-4 cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => handleItemClick(fund, index)}
          >
            <span className="font-medium text-blue-950">{fund.fund_name}</span>
            <span className="mx-2 text-sm">{fund.latest_nav}</span>
            <span className={`${getColor(fund.percentage_change >= 0)} text-sm`}>
              {getArrow(fund.percentage_change >= 0)} {fund.percentage_change}%
            </span>
          </div>
        ))}
      </div>

      {showModal && selectedFund && (
        <div
          ref={modalRef}
          className="absolute bg-white rounded-lg shadow-lg border p-3 w-72 z-1000"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <a
            href={`/mutual-fund-Details/${selectedFund.fund_name}`}
            className="block font-semibold mb-1 text-blue-600 hover:underline"
          >
            {selectedFund.fund_name}
          </a>
          <p className="text-sm text-gray-600 mb-1">
            Latest NAV: {selectedFund.latest_nav}
          </p>
          <p className="mb-1">
            <span className={getColor(selectedFund.percentage_change >= 0)}>
              {getArrow(selectedFund.percentage_change >= 0)}{' '}
              {selectedFund.percentage_change}%
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p><strong>Asset Size:</strong> {selectedFund.asset_size} Cr</p>
              <p><strong>1 Yr:</strong> {selectedFund['1_year_return']}%</p>
            </div>
            <div>
              <p><strong>3 Yr:</strong> {selectedFund['3_year_return']}%</p>
              <p><strong>5 Yr:</strong> {selectedFund['5_year_return']}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MutualFundCarousel;
