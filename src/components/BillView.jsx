/* eslint-disable react/prop-types */
import { useBillContext } from '../contexts/BillContext';

const BillView = ({ item }) => {
   const { onDeleteItem, country } = useBillContext();
   return (
      <div className='mb-3 px-3 pb-2 relative w-full h-20 text-black border-b-2 border-gray-700 flex items-center'>
         <div className='w-4/5 h-full flex flex-col justify-between'>
            <div className='pt-1 text-2xl'>{item.itemName}</div>
            <div className='text-sm italic'>
               {item.membersForTheSplit.join(', ')}{' '}
               {item.membersForTheSplit.length > 1 ? 'together owe' : 'owes'}
            </div>
         </div>
         <div className='w-1/5 h-full flex items-end justify-end text-md'>
            {JSON.parse(country).currency.symbol_native
               ? JSON.parse(country).currency.symbol_native
               : JSON.parse(country).currency.code}{' '}
            {item.totalPrice}
         </div>
         <div className='absolute w-5 h-5 rounded-full top-2 right-2'>
            <button
               className='flex items-center justify-center w-full h-full bg-red-500 rounded-full text-white'
               onClick={(e) => {
                  let delCon = window.confirm(
                     `remove ${item.itemName}(₹${item.totalPrice}) from the bill?`
                  );
                  if (delCon) {
                     onDeleteItem(e, item.itemId);
                  }
               }}
            >
               &minus;
            </button>
         </div>
      </div>
   );
};
export default BillView;
