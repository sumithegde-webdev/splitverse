/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { useMembersContext } from '../contexts/MembersContext';
import { useBillContext } from '../contexts/BillContext';
import { countriesData } from '../assets/countriesData';

const NamesInputPage = ({ setSplitStage }) => {
   const { onSetMembers } = useMembersContext();
   const { country, setCountry } = useBillContext();
   const namesString = useRef('');
   const [error, setErrors] = useState({});

   function userInputVerification(e) {
      e.preventDefault();
      let validations = {};
      const namesArray = namesString.current.value
         .toLowerCase()
         .split(' ')
         // .filter((name) => {
         //    if (name) return name;
         // });
         .filter((name, index, arr) => {
            if (name && !arr.slice(index + 1).includes(name)) {
               return name;
            } else {
               validations = {
                  message: 'same name appeared more than once.',
               };
               return;
            }
         });
      if (
         namesString.current.value == '' ||
         !namesString.current.value.trim()
      ) {
         validations = {
            message: 'please enter at least 2 names, separated by a space.',
         };
      } else if (namesArray.length < 2) {
         if (!validations.message) {
            validations = {
               message: 'just pay the bill, splitverse is not necessary!',
            };
         }
      }

      if (Object.keys(validations).length === 0) {
         onSetMembers(e, namesArray);
         setSplitStage('bill');
      } else {
         setErrors(validations);
         setTimeout(() => {
            setErrors({});
         }, 2000);
      }
   }

   return (
      <>
         <div className='absolute top-[25%] left-[10%] h-2/5 w-4/5 flex flex-col items-left justify-between'>
            <label
               htmlFor='namesInput'
               className='w-full text-center'
            >
               <p className='text-xl'>
                  enter names of all members separated by a{' '}
                  <span className='text-purple-400'>space</span>.
               </p>
               <p className='text-sm text-white'>
                  use{' '}
                  <span className='text-purple-400 text-md'>
                     firstname
                     <span className='text-3xl'>.</span>
                     lastname
                  </span>{' '}
                  format to avoid ambiguity
               </p>
            </label>
            <input
               id='namesInput'
               type='text'
               ref={namesString}
               className={`mx-auto p-3 w-4/5 max-w-[500px] h-[50px] bg-transparent border-2 ${
                  error.message ? 'border-red-400' : 'border-purple-400'
               } outline-none rounded-md text-lg placeholder:text-[12px]`}
               placeholder='// names will be converted to lowercase for consistency'
            />
            {error.message && (
               <p className='absolute w-full text-center top-[65%] h-5 text-sm text-red-400'>
                  {error.message}
               </p>
            )}
            <div className='mx-auto w-4/5 max-w-[500px] h-[45px] flex justify-between'>
               <button
                  type='button'
                  className='w-2/5 max-w-[150px] h-full bg-white text-black text-lg rounded-md hover:bg-black hover:text-purple-400'
                  onClick={(e) => {
                     userInputVerification(e);
                  }}
               >
                  next
               </button>
               <select
                  className='px-2 w-2/5
               h-full bg-transparent border-2 outline-none rounded-md'
                  defaultValue={country}
                  onChange={(e) => {
                     e.preventDefault();
                     setCountry(e.target.value);
                  }}
               >
                  {countriesData.map((country) => (
                     <option
                        key={country.name}
                        value={JSON.stringify(country)}
                     >
                        {country.name} ({country.currency.code})
                     </option>
                  ))}
               </select>
            </div>
            {/* <div className='absolute p-2 top-[125%] left-[20%] h-fit w-3/5 bg-transparent border-2 border-white rounded-lg text-sm flex items-center justify-center gap-4'>
               <div className='bg-transparent w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white'>
                  i
               </div>
               <div className='w-5/6'>
                  {`recreate the group's bill with the ability to add members for the split on each item,
ensuring people end up paying only for things on the bill that they had, rather than an even split on the overall bill`}
               </div>
            </div> */}
         </div>
      </>
   );
};

export default NamesInputPage;
