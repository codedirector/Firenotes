import React, { useEffect } from 'react';

import toast from 'react-hot-toast';
const SummaryCard = ({ id,data, date,delCard}) => {
  const createdon = date.toDate().toLocaleString();
     const handlecopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
       toast.success("Copied to Clipboard")
    } catch (error) {
      console.error(error.message);
    }
   
  };
 
   
  return (
    <div className="bg-white/10 border border-white rounded-lg p-4 text-white max-w-2xl mx-auto my-4 shadow-md">
       
      <div className="flex justify-between text-sm text-gray-300 mb-2 font-mono">
       <div> Created on: <span className="text-white">{createdon}</span> </div>
       <div className='flex'> <button onClick={delCard} className='ml-8 mx-1'>🗑️</button> <button onClick={handlecopy} className='mx-1'>📋</button> </div>
      </div>
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {data}
      </p>
    </div>
  );
};

export default SummaryCard;
