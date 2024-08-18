import { useState } from 'react';
import NamesInputPage from './stages/NamesInputPage';
import BillRecreatePage from './stages/BillRecreatePage';
import FinalSplitPage from './stages/FinalSplitPage';
import TaxAndDiscountPage from './stages/TaxAndDiscountPage';

const App = () => {
   const [splitStage, setSplitStage] = useState('members');

   return (
      <>
         <div className='absolute w-full h-1/6 min-h-[75px] flex flex-col gap-2 items-center justify-center text-4xl'>
            <p>
               <span className='text-purple-400'>split</span>verse
            </p>
            <p className='text-xs italic'>a group meal bill splitter.</p>
         </div>

         {splitStage === 'members' && (
            <NamesInputPage setSplitStage={setSplitStage} />
         )}
         {splitStage === 'bill' && (
            <BillRecreatePage setSplitStage={setSplitStage} />
         )}
         {splitStage === 'taxAndDiscount' && (
            <TaxAndDiscountPage setSplitStage={setSplitStage} />
         )}
         {splitStage === 'finalSplit' && <FinalSplitPage />}

         {(splitStage === 'members' || splitStage === 'finalSplit') && (
            <div className='absolute bottom-2 left-[20%] w-3/5 text-sm text-center'>
               github repo 👉🏼{' '}
               <a
                  href='https://github.com/sumithegde-webdev/splitverse'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <span className='text-purple-400'>split</span>verse
               </a>
            </div>
         )}
      </>
   );
};

export default App;
