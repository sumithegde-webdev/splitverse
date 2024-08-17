/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useMembersContext } from '../contexts/MembersContext';
import { useBillContext } from '../contexts/BillContext';
import { countriesData } from '../assets/countriesData';

const NamesInputPage = ({ setSplitStage }) => {
   const [subStage, setSubStage] = useState('membersNumber');
   const { onSetMembers } = useMembersContext();
   const { country, setCountry } = useBillContext();
   // const namesString = useRef('');
   const [membersNumber, setMembersNumber] = useState(2);
   const [inputMembers, setInputMembers] = useState(['']);
   const [error, setErrors] = useState({});
   const optionValues = new Array(19).fill(0);

   function nameChangesHandler(e) {
      e.preventDefault();
      let arr = inputMembers.map((val, idx) => {
         if (idx === Number(e.target.id)) {
            return e.target.value.toLowerCase();
         } else {
            return val.toLowerCase();
         }
      });
      setInputMembers(arr);
   }

   function userInputVerification(e) {
      e.preventDefault();
      let validations = {};
      inputMembers.filter((name, index, arr) => {
         if (name && !arr.slice(index + 1).includes(name)) {
            return name;
         } else if (name) {
            validations = {
               message: 'some names appeared more than once.',
            };
            return;
         }
      });

      if (inputMembers.includes('')) {
         validations = {
            message: 'please enter the names of all members.',
         };
      }

      inputMembers.map((memberName) => {
         if (!/^[a-zA-Z ]*$/.test(memberName)) {
            validations = {
               message: 'use alphabets and spaces only.',
            };
         }
      });

      if (Object.keys(validations).length === 0) {
         onSetMembers(e, inputMembers);
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
         <div className='absolute top-[25%] left-[10%] h-3/5 w-4/5 flex flex-col items-left justify-between'>
            {subStage === 'membersNumber' && (
               <div className='mx-auto w-4/5 max-w-[500px] flex flex-col space-y-7 items-center justify-between '>
                  <p>select number of members</p>
                  <div className='w-full flex justify-center space-x-6'>
                     <select
                        // defaultValue={2}
                        className={`px-2 w-fit max-w-[150px] h-[50px] bg-transparent border-2 text-left border-purple-400 outline-none rounded-md text-lg placeholder:text-[12px]`}
                        value={membersNumber}
                        onChange={(e) => {
                           setMembersNumber(Number(e.target.value));
                        }}
                     >
                        {optionValues.map((val, index) => {
                           return (
                              <option
                                 key={index + 2}
                                 value={index + 2}
                              >
                                 {index + 2}
                              </option>
                           );
                        })}
                     </select>
                     <button
                        type='button'
                        className='w-2/5 max-w-[150px] h-full bg-white text-black text-lg rounded-md hover:bg-black hover:text-purple-400'
                        onClick={() => {
                           let arr = new Array(membersNumber).fill('');
                           setInputMembers(arr);
                           setSubStage('enterNames');
                        }}
                     >
                        enter names
                     </button>
                  </div>
               </div>
            )}
            {subStage === 'enterNames' && (
               <div className='mx-auto w-4/5 max-w-[500px] h-[300px] min-h-[250px] overflow-y-auto flex flex-col space-y-5'>
                  {error.message ? (
                     <p className='text-center text-red-400'>{error.message}</p>
                  ) : (
                     <p className='text-center'>
                        enter the names of all members
                     </p>
                  )}
                  {inputMembers.map((val, index) => {
                     return (
                        <input
                           key={index}
                           id={index}
                           type='text'
                           className={`mx-auto p-3 w-4/5 max-w-[500px] h-[50px] bg-transparent border-2 ${
                              error.message
                                 ? 'border-red-400 placeholder:text-red-400'
                                 : 'border-purple-400'
                           } outline-none rounded-md text-lg placeholder:text-[12px]`}
                           placeholder={
                              error.message
                                 ? 'cannot be empty'
                                 : `enter name ${index + 1}`
                           }
                           value={val}
                           onChange={(e) => {
                              console.log(inputMembers);
                              nameChangesHandler(e);
                           }}
                        />
                     );
                  })}
               </div>
            )}

            <div className='mx-auto w-4/5 max-w-[500px] h-[45px] flex justify-between'>
               <button
                  type='button'
                  className={`${
                     subStage === 'membersNumber'
                        ? 'pointer-events-none opacity-20'
                        : ''
                  } w-2/5 max-w-[150px] h-full bg-white text-black text-lg rounded-md hover:bg-black hover:text-purple-400`}
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
      </>
   );
};

export default NamesInputPage;
