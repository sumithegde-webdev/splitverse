/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from 'react';

// const initialBill = [
//    {
//       itemId: '',
//       itemName: '',
//       totalPrice: 0,
//       membersForTheSplit: [],
//       pricePerHead: 0,
//    },
// ];

function billReducer(state, action) {
   switch (action.type) {
      case 'addItem':
         return [...state, action.payload];

      case 'removeItem':
         return state.filter(
            (item) => item.itemId !== action.payload.itemId && item
         );

      case 'editItem':
         return state.map((item) => {
            item.itemId === action.itemId
               ? { ...item, ...action.payload }
               : item;
         });
   }
}

const BillContext = createContext();

const BillProvider = ({ children }) => {
   const [bill, billDispatch] = useReducer(billReducer, []);
   const defaultValue = {
      name: 'India',
      code: 'IN',
      currency: {
         code: 'INR',
         name: 'Indian Rupee',
         symbol: 'Rs',
         symbol_native: '₹',
      },
   };
   const [country, setCountry] = useState(JSON.stringify(defaultValue));

   function onAddItem(e, item) {
      e.preventDefault();
      billDispatch({ type: 'addItem', payload: item });
   }

   function onDeleteItem(e, itemId) {
      e.preventDefault();
      billDispatch({ type: 'removeItem', payload: { itemId: itemId } });
   }

   // function onEditItem(e, itemId, item) {
   //    e.preventDefault();
   //    billDispatch({
   //       type: 'editItem',
   //       payload: {
   //          ...item,
   //       },
   //       itemId: itemId,
   //    });
   // }

   return (
      <BillContext.Provider
         value={{
            bill,
            onAddItem,
            onDeleteItem,
            country,
            setCountry,
            // onEditItem,
         }}
      >
         {children}
      </BillContext.Provider>
   );
};

function useBillContext() {
   const billContext = useContext(BillContext);
   if (billContext === undefined) {
      console.error('Bill Context is out of scope!');
      return null;
   }
   return billContext;
}

export { BillProvider, useBillContext };
