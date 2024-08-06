/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useBillContext } from '../contexts/BillContext';
import { useMembersContext } from '../contexts/MembersContext';
import BillItemForm from '../components/BillItemForm';
import BillView from '../components/BillView';

const BillRecreatePage = ({ setSplitStage }) => {
   const { defaultTitle } = useMembersContext();
   const { bill } = useBillContext();

   const [addBillItem, setAddBillItem] = useState(false);

   useEffect(() => {
      document.title = 'splitverse | bill';

      return function () {
         document.title = defaultTitle;
      };
   }, [defaultTitle]);

   return (
      <div className='absolute flex flex-col justify-between left-[10%] w-4/5 h-2/3 top-[20%]'>
         {addBillItem && <BillItemForm setAddBillItem={setAddBillItem} />}

         {!addBillItem &&
            (bill.length > 0 ? (
               <div className='mx-auto p-5 w-full max-w-[600px] h-4/5 max-h-[350px] bg-white rounded-tr-2xl rounded-bl-2xl overflow-y-auto'>
                  {bill.map((item) => {
                     return (
                        <BillView
                           key={item.itemId}
                           item={item}
                        />
                     );
                  })}
               </div>
            ) : (
               <div className='mx-auto p-5 w-full max-w-[600px] h-4/5 max-h-[350px] bg-white rounded-tr-2xl rounded-bl-2xl text-black'>
                  recreate the bill, only this time, select members for the
                  split on each item you add.
               </div>
            ))}

         {!addBillItem && (
            <div className='relative mt-5 h-[50px] mx-auto w-full max-w-[600px]'>
               {bill.length > 0 && (
                  <button
                     type='button'
                     className='absolute bottom-0 left-0 w-2/5 h-[50px] max-w-[200px] bg-black rounded-md hover:bg-purple-400 hover:text-black'
                     onClick={(e) => {
                        e.preventDefault();
                        let billCon = window.confirm(
                           'no further changes to the bill possible. move on?'
                        );
                        if (billCon) {
                           setSplitStage('finalSplit');
                        }
                     }}
                  >
                     done
                  </button>
               )}

               <button
                  type='button'
                  className='absolute bottom-0 right-0 text-black w-2/5 max-w-[200px] h-[50px] bg-purple-400 rounded-md hover:text-white'
                  onClick={() => setAddBillItem(true)}
               >
                  add a new item
               </button>
            </div>
         )}
      </div>
   );
};
export default BillRecreatePage;
