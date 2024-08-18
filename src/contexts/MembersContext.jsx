/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from 'react';

const membersState = [
   {
      name: '',
      split: 0,
      items: [],
   },
];

function membersReducer(state, action) {
   switch (action.type) {
      case 'setMembers':
         return action.payload.map((member) => {
            return { name: member, split: 0, items: [] };
         });

      case 'updateSplits':
         return state.map((member) => {
            if (member.name === action.payload.name) {
               return {
                  ...member,
                  split: Number(member.split) + Number(action.payload.split),
                  items: [...member.items, action.payload.item],
               };
            } else {
               return member;
            }
         });

      default:
         return null;
   }
}

const MembersContext = createContext();

const MembersProvider = ({ children }) => {
   const [members, membersDispatch] = useReducer(membersReducer, membersState);

   const [sessionToken, setSessionToken] = useState('');

   const defaultTitle = 'splitverse';

   function setMembers(e, members) {
      e.preventDefault();
      const membersArray = members.filter((member) => {
         if (member) return member.toLowerCase();
      });

      membersDispatch({ type: 'setMembers', payload: membersArray });
      setSessionToken(
         membersArray[0].split(' ')[0].concat(
            '#',
            `${new Date().getTime()}`
               // .toISOString()
               .concat('#', membersArray[membersArray.length - 1].split(' ')[0])
         )
      );
   }

   function updateSplits(member, item) {
      membersDispatch({
         type: 'updateSplits',
         payload: {
            name: member.name,
            split: Number(item.pricePerHead).toFixed(3),
            item: item.itemName,
         },
      });
   }

   return (
      <MembersContext.Provider
         value={{
            members,
            onSetMembers: setMembers,
            onFinalSplit: updateSplits,
            sessionToken,
            defaultTitle,
         }}
      >
         {children}
      </MembersContext.Provider>
   );
};

function useMembersContext() {
   const membersContext = useContext(MembersContext);
   if (membersContext === undefined) {
      console.error('Context out of scope!');
      return null;
   }
   return membersContext;
}

export { MembersProvider, useMembersContext };
