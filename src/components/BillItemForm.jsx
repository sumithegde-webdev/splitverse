/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useBillContext } from '../contexts/BillContext';
import { useMembersContext } from '../contexts/MembersContext';

const BillItemForm = ({ setAddBillItem, editItem = {}, setEditItem }) => {
   const { members } = useMembersContext();
   const { onAddItem, onEditItem } = useBillContext();
   const [membersSelected, setMembersSelected] = useState(
      editItem.itemId ? editItem.membersForTheSplit : []
   );
   const [itemErrors, setItemErrors] = useState({});

   const [itemNameInput, setItemNameInput] = useState(
      editItem.itemId ? editItem.itemName : ''
   );
   const [itemPriceInput, setItemPriceInput] = useState(
      editItem.itemId ? Number(editItem.totalPrice) : 0
   );

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

      if (!itemNameInput.trim()) {
         validations.itemNameError = 'name cannot be empty';
      }
      if (itemPriceInput === 0) {
         validations.itemPriceError = 'price cannot be 0';
      }
      if (membersSelected.length === 0) {
         validations.membersError = 'select atleast one member for the split';
      }

      if (Object.keys(validations).length === 0 && !editItem.itemId) {
         //
         onAddItem(e, {
            itemId: itemNameInput.toLowerCase().concat(new Date().getTime()),
            itemName: itemNameInput.toLowerCase(),
            totalPrice: Math.abs(Number(itemPriceInput)),
            membersForTheSplit:
               //map over selected members and apply percentage calculation
               membersSelected,
            //priceAsPerConsumptionPercentage
            // splitPercents: [],
            pricePerHead: Number(
               (itemPriceInput / membersSelected.length).toFixed(3)
            ),
         });
         setAddBillItem(false);
      } else if (Object.keys(validations).length === 0 && editItem.itemId) {
         onEditItem(e, editItem.itemId, {
            itemName: itemNameInput.toLowerCase(),
            totalPrice: Math.abs(Number(itemPriceInput)),
            membersForTheSplit: membersSelected,
            pricePerHead: Number(
               (itemPriceInput / membersSelected.length).toFixed(3)
            ),
         });
         setEditItem({});
         setAddBillItem(false);
      } else {
         setItemErrors(validations);
         setTimeout(() => {
            setItemErrors({});
         }, 2000);
      }
   }

   return (
      <div className='absolute z-30 w-full h-full flex flex-col space-y-5 bg-[#222]'>
         <input
            type='text'
            placeholder={
               itemErrors.itemNameError
                  ? `${itemErrors.itemNameError}`
                  : 'enter the item name'
            }
            // ref={itemNameRef}
            // value={itemNameRef.current.value}
            value={itemNameInput}
            onChange={(e) => {
               setItemNameInput(e.target.value);
            }}
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
            // ref={itemPriceRef}
            value={Number(itemPriceInput)}
            onChange={(e) => {
               setItemPriceInput(Number(e.target.value));
            }}
            className={`mx-auto p-3 bg-transparent w-full max-w-[450px] h-[50px] border-2 ${
               itemErrors.itemPriceError
                  ? 'border-red-400 placeholder:text-red-400'
                  : 'border-violet-400'
            } outline-none rounded-md text-lg`}
         ></input>
         <div className='mx-auto w-full max-w-[300px] h-[250px] flex flex-col space-y-4 overflow-y-auto'>
            <div
               className={`mx-auto w-full h-[45px] flex items-center justify-center border ${
                  itemErrors.membersError ? 'border-red-400' : 'border-white'
               } rounded-lg hover:bg-purple-400`}
            >
               {/* toggler to switch to fine-grain split */}
               <div className='w-1/5 h-full flex items-center justify-center'>
                  <input
                     type='checkbox'
                     id='selectAll'
                     className='w-[20px]'
                     name={`all`}
                     value={`${members}`}
                     checked={membersSelected.length === members.length}
                     onChange={(e) => {
                        handleCheckChange(e);
                     }}
                  />
               </div>
               <label
                  className='w-4/5 h-full flex items-center text-lg'
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
                  <div className='w-1/5 h-full flex items-center justify-center'>
                     <input
                        type='checkbox'
                        id={`${member.name}`}
                        className='w-[20px]'
                        name={`${member.name}`}
                        value={`${member.name}`}
                        checked={membersSelected.includes(member.name)}
                        onChange={(e) => {
                           handleCheckChange(e);
                        }}
                     />
                  </div>
                  <label
                     className='w-4/5 h-full flex items-center text-lg'
                     htmlFor={`${member.name}`}
                  >
                     {member.name}
                  </label>
               </div>
            ))}
         </div>
         <div className='relative mx-auto w-full max-w-[450px] h-[50px]'>
            {editItem.itemId ? (
               <button
                  type='button'
                  className='absolute h-full w-2/5 max-w-[100px] border hover:bg-green-600 left-0 rounded-md'
                  onClick={(e) => {
                     itemAdditionValidation(e);
                  }}
               >
                  edit
               </button>
            ) : (
               <button
                  type='button'
                  className='absolute h-full w-2/5 max-w-[100px] border hover:bg-green-600 left-0 rounded-md'
                  onClick={(e) => {
                     itemAdditionValidation(e);
                  }}
               >
                  add
               </button>
            )}
            <p className='absolute left-[30%] w-2/5 h-full text-red-400 text-center'>
               {itemErrors.membersError ||
                  itemErrors.itemNameError ||
                  itemErrors.itemPriceError}
            </p>
            <button
               className='absolute h-full w-2/5 max-w-[100px] border hover:bg-red-600 right-0 rounded-md'
               onClick={() => {
                  if (editItem.itemId) {
                     setEditItem({});
                  }
                  setAddBillItem(false);
               }}
            >
               cancel
            </button>
         </div>
      </div>
   );
};
export default BillItemForm;
