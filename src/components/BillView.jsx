/* eslint-disable react/prop-types */
import { useBillContext } from '../contexts/BillContext';
// import BillItemForm from './BillItemForm';

const BillView = ({ item, setEditItem }) => {
   const { onDeleteItem, country } = useBillContext();

   return (
      <>
         <div className='mb-3 px-3 pb-2 relative w-full h-fit text-black border-b-2 border-gray-700 flex items-center'>
            <div className='w-4/5 h-full flex flex-col justify-between'>
               <div className='pt-1 text-2xl'>
                  {item.itemName.toLowerCase()}
               </div>
               <div className='text-xs italic'>
                  {item.membersForTheSplit.join(', ')}{' '}
                  {item.membersForTheSplit.length > 1 ? 'together owe' : 'owes'}
               </div>
            </div>
            <div className='absolute bottom-2 right-2 w-1/5 flex items-end justify-end text-md'>
               {JSON.parse(country).currency.symbol_native
                  ? JSON.parse(country).currency.symbol_native
                  : JSON.parse(country).currency.code}{' '}
               {item.totalPrice}
            </div>
            <div className='absolute w-10 h-5 rounded-md top-2 right-10'>
               <button
                  className='flex items-center justify-center w-full h-full bg-white rounded-full text-black border border-black'
                  onClick={(e) => {
                     setEditItem(item);
                     // setEditBillItem(true);
                  }}
               >
                  edit
               </button>
            </div>
            <div className='absolute w-5 h-5 rounded-full top-2 right-2'>
               <button
                  className='flex items-center justify-center w-full h-full bg-red-500 rounded-full text-white'
                  onClick={(e) => {
                     let delCon = window.confirm(
                        `remove ${item.itemName}(${
                           JSON.parse(country).currency.symbol_native
                              ? JSON.parse(country).currency.symbol_native
                              : JSON.parse(country).currency.code
                        }${item.totalPrice}) from the bill?`
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
      </>
   );
};
export default BillView;
