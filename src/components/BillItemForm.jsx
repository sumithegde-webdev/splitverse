/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { useBillContext } from '../contexts/BillContext';
import { useMembersContext } from '../contexts/MembersContext';

const BillItemForm = ({ setAddBillItem }) => {
   const { members } = useMembersContext();
   const { onAddItem } = useBillContext();
   const [membersSelected, setMembersSelected] = useState([]);
   const [itemErrors, setItemErrors] = useState({});

   const itemNameRef = useRef('');
   const itemPriceRef = useRef(0);

   function handleCheckChange(e) {
      const currentId = e.target.value;

      if (e.target.id === 'selectAll') {
         if (e.target.checked === true) {
            setMembersSelected(members.map((member) => member.name));
            e.target.checked = !e.target.checked;
         } else {
            setMembersSelected([]);
            e.target.checked = true;
         }
      } else if (e.target.checked) {
         setMembersSelected([...membersSelected, currentId]);
      } else {
         setMembersSelected(
            membersSelected.filter((member) => member !== currentId)
         );
      }
   }

   function itemAdditionValidation(e) {
      e.preventDefault();
      let validations = {};

      if (!itemNameRef.current.value.trim()) {
         validations.itemNameError = 'cannot be empty';
      }
      if (!itemPriceRef.current.value.trim()) {
         validations.itemPriceError = 'cannot be empty';
      }
      if (membersSelected.length === 0) {
         validations.membersError = 'select atleast one member for the split';
      }

      if (Object.keys(validations).length === 0) {
         //
         onAddItem(e, {
            itemId: itemNameRef.current.value.concat(new Date().getTime()),
            itemName: itemNameRef.current.value.toLowercase(),
            totalPrice: Math.abs(Number(itemPriceRef.current.value)),
            membersForTheSplit:
               //map over selected members and apply percentage calculation
               membersSelected,
            //priceAsPerConsumptionPercentage
            splitPercents: [],
            pricePerHead: Number(
               (itemPriceRef.current.value / membersSelected.length).toFixed(3)
            ),
         });
         setAddBillItem(false);
      } else {
         setItemErrors(validations);
         setTimeout(() => {
            setItemErrors({});
         }, 2000);
      }
   }

   return (
      <div className='flex flex-col space-y-5'>
         <input
            type='text'
            placeholder={
               itemErrors.itemNameError
                  ? `${itemErrors.itemNameError}`
                  : 'enter the item name'
            }
            ref={itemNameRef}
            className={`mx-auto p-3 bg-transparent w-full max-w-[450px] h-[50px] border-2 ${
               itemErrors.itemNameError
                  ? 'border-red-400 placeholder:text-red-400'
                  : 'border-violet-400'
            } outline-none rounded-md text-lg`}
         ></input>
         <input
            type='number'
            min={0}
            placeholder={
               itemErrors.itemPriceError
                  ? `${itemErrors.itemPriceError}`
                  : 'enter the item price'
            }
            ref={itemPriceRef}
            className={`mx-auto p-3 bg-transparent w-full max-w-[450px] h-[50px] border-2 ${
               itemErrors.itemPriceError
                  ? 'border-red-400 placeholder:text-red-400'
                  : 'border-violet-400'
            } outline-none rounded-md text-lg`}
         ></input>
         <div className='mx-auto w-full max-w-[300px] h-[250px] flex flex-col space-y-4 overflow-y-auto'>
            <div
               className={`mx-auto w-full h-[45px] flex items-center border ${
                  itemErrors.membersError ? 'border-red-400' : 'border-white'
               } rounded-lg hover:bg-purple-400`}
            >
               {/* toggler to switch to fine-grain split */}
               <input
                  type='checkbox'
                  id='selectAll'
                  className='w-1/5'
                  name={`all`}
                  value={`${members}`}
                  checked={membersSelected.length === members.length}
                  onChange={(e) => {
                     handleCheckChange(e);
                  }}
               />
               <label
                  className='w-4/5 text-lg'
                  htmlFor='selectAll'
               >
                  select all members
               </label>
            </div>
            {members.map((member, index) => (
               <div
                  key={index}
                  className={`mx-auto w-full h-[45px] flex items-center border ${
                     itemErrors.membersError ? 'border-red-400' : 'border-white'
                  } rounded-lg hover:bg-purple-400`}
               >
                  <input
                     type='checkbox'
                     id={`${member.name}`}
                     className='w-1/5'
                     name={`${member.name}`}
                     value={`${member.name}`}
                     checked={membersSelected.includes(member.name)}
                     onChange={(e) => {
                        handleCheckChange(e);
                     }}
                  ></input>
                  <label
                     className='w-4/5 text-lg'
                     htmlFor={`${member.name}`}
                  >
                     {member.name}
                  </label>
               </div>
            ))}
         </div>
         <div className='relative mx-auto w-full max-w-[450px] h-[50px]'>
            <button
               type='button'
               className='absolute h-full w-2/5 max-w-[100px] border hover:bg-green-600 left-0 rounded-md'
               onClick={(e) => {
                  itemAdditionValidation(e);
               }}
            >
               add
            </button>
            <p className='absolute left-[30%] w-2/5 h-full text-red-400 text-center'>
               {itemErrors.membersError}
            </p>
            <button
               className='absolute h-full w-2/5 max-w-[100px] border hover:bg-red-600 right-0 rounded-md'
               onClick={() => setAddBillItem(false)}
            >
               cancel
            </button>
         </div>
      </div>
   );
};
export default BillItemForm;
