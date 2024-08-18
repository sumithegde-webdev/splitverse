/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useBillContext } from '../contexts/BillContext';
import { useMembersContext } from '../contexts/MembersContext';

const TaxAndDiscountPage = ({ setSplitStage }) => {
   const { onAddItem } = useBillContext();
   const { members } = useMembersContext();
   const [taxToggler, setTaxToggler] = useState(false);
   const [discountToggler, setDiscountToggler] = useState(false);
   const [taxValue, setTaxValue] = useState(0);
   const [discountValue, setDiscountValue] = useState(0);
   const [error, setError] = useState({
      messageTax: '',
      messageDis: '',
   });

   function tanddverification(e) {
      let validationsTax = {};
      let validationsDis = {};
      if (
         taxToggler &&
         discountToggler &&
         !taxValue > 0 &&
         !discountValue > 0
      ) {
         validationsTax = {
            messageTax: 'tax cannot be 0/empty if toggled',
         };
         validationsDis = {
            messageDis: 'discount cannot be 0/empty if toggled',
         };
         setError({
            ...error,
            messageTax: validationsTax.messageTax,
            messageDis: validationsDis.messageDis,
         });
         setTimeout(() => {
            setError({});
         }, 2000);
         return;
      }
      if (taxToggler && !taxValue > 0) {
         validationsTax = {
            messageTax: 'tax cannot be 0/empty if toggled',
         };
         setError({ ...error, messageTax: validationsTax.messageTax });
         setTimeout(() => {
            setError({});
         }, 2000);
         return;
      }
      if (discountToggler && !discountValue > 0) {
         validationsDis = {
            messageDis: 'discount cannot be 0/empty if toggled',
         };
         setError({ ...error, messageDis: validationsDis.messageDis });
         setTimeout(() => {
            setError({});
         }, 2000);
         return;
      }

      //final verification and submit
      if (taxToggler && discountToggler) {
         // console.log('passed validations');
         onAddItem(e, {
            itemId: 'tax'.concat(new Date().getTime()),
            itemName: 'tax',
            totalPrice: Math.abs(Number(taxValue)),
            membersForTheSplit: members.map((member) => member.name),
            pricePerHead: Number((taxValue / members.length).toFixed(3)),
         });
         onAddItem(e, {
            itemId: 'discount'.concat(new Date().getTime()),
            itemName: 'discount',
            totalPrice: Math.abs(Number(discountValue)) * -1,
            membersForTheSplit: members.map((member) => member.name),
            pricePerHead:
               Number((discountValue / members.length).toFixed(3)) * -1,
         });
         setSplitStage('finalSplit');
         return;
      }
      if (taxToggler) {
         onAddItem(e, {
            itemId: 'tax'.concat(new Date().getTime()),
            itemName: 'tax',
            totalPrice: Math.abs(Number(taxValue)),
            membersForTheSplit: members.map((member) => member.name),
            pricePerHead: Number((taxValue / members.length).toFixed(3)),
         });
         setSplitStage('finalSplit');
         return;
      }
      if (discountToggler) {
         onAddItem(e, {
            itemId: 'discount'.concat(new Date().getTime()),
            itemName: 'discount',
            totalPrice: Math.abs(Number(discountValue)) * -1,
            membersForTheSplit: members.map((member) => member.name),
            pricePerHead:
               Number((discountValue / members.length).toFixed(3)) * -1,
         });
         setSplitStage('finalSplit');
         return;
      }
      setSplitStage('finalSplit');
   }

   return (
      <div className='absolute top-[27.5%] left-[12.5%] w-3/4 h-3/5 flex flex-col items-center space-y-14'>
         {/* tax section */}
         <div className='w-3/5 max-w-[300px] h-1/5 flex flex-col items-center justify-center space-y-2'>
            {/* <span>tax</span> */}
            <div className='w-full flex items-center justify-between'>
               <span
                  className={`text-lg ${
                     taxToggler ? '' : 'pointer-events-none opacity-25'
                  }`}
               >
                  tax
               </span>
               <div className='h-full w-[50px] bg-black rounded-full flex items-center px-[2.5px]'>
                  <span
                     className={`absolute h-[20px] w-[20px] rounded-full
                        ${
                           taxToggler
                              ? 'translate-x-[25px] bg-violet-400'
                              : 'translate-x-0 bg-white'
                        } duration-500`}
                     onClick={() => {
                        setTaxToggler(!taxToggler);
                        setTaxValue('');
                     }}
                  ></span>
               </div>
            </div>
            <input
               id='taxInput'
               type='number'
               min={0}
               className={`p-3 w-full max-w-[500px] h-[50px] bg-transparent border-2 ${
                  error.messageTax ? 'border-red-400' : 'border-purple-400'
               } outline-none rounded-md text-lg placeholder:text-[12px] ${
                  taxToggler ? '' : 'pointer-events-none opacity-25'
               }`}
               placeholder='enter tax amount'
               value={taxValue}
               onChange={(e) => {
                  setTaxValue(Number(e.target.value));
               }}
            />
            {error.messageTax ? (
               <p className='w-full text-center text-xs flex items-center justify-center space-x-2 text-red-400'>
                  {error.messageTax}
               </p>
            ) : (
               <span className='w-full text-slate-400 text-center text-xs flex items-center justify-center space-x-2'>
                  <div>
                     {`if you've added 'tax' as an item in the bill, do not add tax again!`}
                  </div>
               </span>
            )}
         </div>
         {/* discount section */}
         <div className='relative w-3/5 max-w-[300px] h-1/5 flex flex-col items-center justify-center space-y-2'>
            {/* <span>discount</span> */}
            <div className='w-full flex items-center justify-between'>
               <span
                  className={`text-lg ${
                     discountToggler ? '' : 'pointer-events-none opacity-25'
                  }`}
               >
                  discount
               </span>
               <div className='h-full w-[50px] bg-black rounded-full flex items-center px-[2.5px]'>
                  <span
                     className={`absolute h-[20px] w-[20px] rounded-full
                        ${
                           discountToggler
                              ? 'translate-x-[25px] bg-violet-400'
                              : 'translate-x-0 bg-white'
                        } duration-500`}
                     onClick={() => {
                        setDiscountToggler(!discountToggler);
                        setDiscountValue('');
                     }}
                  ></span>
               </div>
            </div>
            <input
               type='number'
               min={0}
               className={`p-3 w-full max-w-[500px] h-[50px] bg-transparent border-2 ${
                  error.messageDis ? 'border-red-400' : 'border-purple-400'
               } outline-none rounded-md text-lg placeholder:text-[12px] ${
                  discountToggler ? '' : 'pointer-events-none opacity-25'
               }`}
               placeholder='enter the discounted price'
               value={Math.abs(discountValue)}
               onChange={(e) => {
                  setDiscountValue(Math.abs(Number(e.target.value)));
               }}
            />
            {error.messageDis ? (
               <p className='absolute top-[110%] text-center text-xs text-red-400'>
                  {error.messageDis}
               </p>
            ) : (
               <></>
            )}
         </div>
         <div className='relative mt-5 h-[80px] mx-auto w-full max-w-[600px] flex items-center justify-center'>
            <button
               type='button'
               className='w-2/5 h-[50px] max-w-[200px] bg-black rounded-md hover:bg-purple-400 hover:text-black'
               onClick={(e) => {
                  tanddverification(e);
               }}
            >
               done
            </button>
         </div>
      </div>
   );
};
export default TaxAndDiscountPage;
