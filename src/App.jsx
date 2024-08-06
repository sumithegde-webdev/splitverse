import { useState } from 'react';
import NamesInputPage from './stages/NamesInputPage';
import BillRecreatePage from './stages/BillRecreatePage';
import FinalSplitPage from './stages/FinalSplitPage';

const App = () => {
   const [splitStage, setSplitStage] = useState('members');

   return (
      <>
         <div className='absolute w-full h-1/6 min-h-[75px] flex items-center justify-center text-4xl'>
            <span className='text-purple-400'>split</span>verse
         </div>
         {splitStage === 'members' && (
            <NamesInputPage setSplitStage={setSplitStage} />
         )}
         {splitStage === 'bill' && (
            <BillRecreatePage setSplitStage={setSplitStage} />
         )}
         {splitStage === 'finalSplit' && <FinalSplitPage />}
      </>
   );
};

export default App;
