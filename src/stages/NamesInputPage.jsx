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
         .filter((name) => {
            if (name) return name;
         });
      if (
         namesString.current.value == '' ||
         !namesString.current.value.trim()
      ) {
         validations = {
            message: 'please enter at least 2 names, separated by a space.',
         };
      } else if (namesArray.length < 2) {
         validations = {
            message: 'just pay the bill, splitverse is not necessary!',
         };
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
      <div className='absolute top-[25%] left-[10%] h-2/5 w-4/5 flex flex-col items-left justify-between'>
         <label
            htmlFor='namesInput'
            className='w-full text-center text-xl'
         >
            enter names separated by a{' '}
            <span className='text-purple-400'>space</span>.
         </label>
         <input
            id='namesInput'
            type='text'
            ref={namesString}
            className={`mx-auto p-3 w-4/5 max-w-[500px] h-[50px] bg-transparent border-2 ${
               error.message ? 'border-red-400' : 'border-purple-400'
            } outline-none rounded-md text-lg placeholder:text-[12px]`}
            placeholder='// names will be converted to lowercase for consistency'
         ></input>
         {error.message && (
            <p className='absolute w-full text-center top-[60%] h-5 text-sm text-red-400'>
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
      </div>
   );
};

export default NamesInputPage;
