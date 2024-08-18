import { useEffect, useState } from 'react';
import { useBillContext } from '../contexts/BillContext';
import { useMembersContext } from '../contexts/MembersContext';
import jsPDF from 'jspdf';
import splitverseLogo from '../assets/splitverse.png';
import Button from '../components/Button';

const FinalSplitPage = () => {
   const { members, onFinalSplit, defaultTitle, sessionToken } =
      useMembersContext();
   const { bill, country } = useBillContext();
   let totalTax = 0;
   let discount = 0;
   bill.filter((item) => {
      if (item.itemId.includes('tax')) {
         totalTax = item.totalPrice;
      }
      if (item.itemId.includes('discount')) {
         discount = Math.abs(item.totalPrice);
      }
   });
   // console.log(bill);
   // console.log(totalTax);
   // console.log(discount);

   let total = 0;
   bill.map((item) => (total = total + item.totalPrice));

   const [buttonDone, setButtonDone] = useState(false);

   useEffect(() => {
      document.title = 'splitverse | split';

      return function () {
         document.title = defaultTitle;
      };
   }, [defaultTitle]);

   function refreshPage() {
      let newCon = window.confirm('split another bill?').valueOf();
      if (newCon) {
         window.location.reload(false);
      }
   }

   function finalSplitCalculation() {
      bill.map((item) => {
         // item.membersForTheSplit.includes
         members.map((member) => {
            if (item.membersForTheSplit.includes(member.name)) {
               onFinalSplit(member, item);
            }
         });
      });
   }

   function renderPdf(mode) {
      //orientation, unit, size, compressPDF
      let doc = jsPDF('p', 'cm', 'junior-legal', false);
      doc.rect(0, 0, 13, 21, 'F');
      doc.addImage(
         splitverseLogo,
         'PNG',
         4.45913622,
         0.75,
         3.90972756,
         1.0176282
      );
      doc.setTextColor('white');
      doc.setFontSize(9);
      doc.text(
         `${Intl.DateTimeFormat('en-IN', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
         }).format(new Date())}`,
         0.5,
         2.75
      );
      doc.setTextColor('#c084fc');
      doc.setFontSize(7);
      doc.text(`${sessionToken}`, 0.5, 3.25);
      doc.setTextColor('white');
      let startPoint = 4;
      members.forEach((member) => {
         // doc.setTextColor('#c084fc');
         doc.setFontSize(9);
         doc.text(
            `${member.name}'s split  |  ${
               JSON.parse(country)?.currency.code
            }.${member.split.toFixed(2)}`,
            0.5,
            startPoint
         );
         // doc.setTextColor('#ffffff');
         doc.setFontSize(members.length > 11 ? 5 : 6);
         doc.text(
            `  - ${member.items
               .filter((item) => {
                  if (!item.includes('discount')) {
                     return item;
                  }
               })
               .join(' | ')} -`,
            0.5,
            members.length > 11 ? startPoint + 0.35 : startPoint + 0.45
         );
         startPoint += members.length > 11 ? 0.95 : 1.35;
      });
      doc.setFontSize(14);
      doc.setTextColor('#c084fc');
      doc.text(
         `total bill - ${JSON.parse(country)?.currency.code}.${total}`,
         0.5,
         totalTax && discount ? 18.45 : totalTax || discount ? 18.75 : 19.25
      );
      doc.setFontSize(8);
      doc.setTextColor('#ffffff');
      totalTax > 0
         ? doc.text(
              `tax - ${JSON.parse(country)?.currency.code}.${totalTax}`,
              0.5,
              discount ? 18.9 : 19.25
           )
         : '';
      discount
         ? doc.text(
              `discount - ${JSON.parse(country)?.currency.code}.${discount}`,
              0.5,
              19.25
           )
         : '';
      doc.setDisplayMode('fullheight');
      doc.setProperties({
         title: `${sessionToken}`,
      });
      // doc.setFileId(sessionToken);
      if (mode === 'download') {
         doc.save(`${sessionToken}.pdf`);
      } else {
         // window.open(doc.output('datauri'));
         window.open(doc.output('bloburl', {}));
      }
   }

   const text = (
      <>
         <span className='text-purple-400 font-normal'>split</span>
         <span className='text-white font-normal'>verse</span>
         &nbsp;bill
      </>
   );

   return (
      <div className='absolute top-[17.5%] left-[10%] w-4/5 h-3/5'>
         <button
            type='button'
            onClick={() => {
               finalSplitCalculation();
               setButtonDone(true);
            }}
            className={`${
               buttonDone
                  ? 'hidden'
                  : 'block mx-auto mt-20 w-[150px] h-[60px] bg-purple-500 rounded-lg text-xl hover:bg-black'
            }`}
         >
            split
         </button>
         {members[0].split != 0 ? (
            <div className='w-full h-[90%] grid grid-cols-3 gap-4 overflow-y-auto'>
               {members.map((member) => {
                  return (
                     <div
                        className='mx-auto w-full max-w-[175px] h-full min-h-[100px] max-h-[120px] bg-violet-300 flex flex-col items-center justify-center text-black rounded-xl text-wrap'
                        key={member.name}
                     >
                        {member.name.split(' ').length === 1 ? (
                           <div className='w-full text-center text-sm text-wrap'>
                              {member.name}
                              {`'s`}
                           </div>
                        ) : member.name.split(' ').length === 2 ? (
                           <div className='w-full text-center text-sm text-wrap'>
                              <p>{member.name.split(' ')[0]}</p>
                              {member.name.split(' ')[1]}
                              {`'s`}
                           </div>
                        ) : (
                           <div className='w-full text-center text-sm text-wrap'>
                              <p>{member.name.split(' ')[0]}</p>
                              {
                                 member.name.split(' ')[
                                    member.name.split(' ').length - 1
                                 ]
                              }
                              {`'s`}
                           </div>
                        )}
                        <div className='italic text-xs'>share is</div>
                        <div className='text-lg'>
                           {JSON.parse(country)?.currency.symbol_native
                              ? JSON.parse(country)?.currency.symbol_native
                              : JSON.parse(country)?.currency.code}{' '}
                           {member.split.toFixed(2)}
                        </div>
                        {/* <div className='italic text-sm'>during this outing</div> */}
                     </div>
                  );
               })}
            </div>
         ) : (
            <div></div>
         )}
         {buttonDone && (
            <div className='mt-6 pt-3 full h-[100px] flex flex-col items-center justify-between border-t-2 border-white text-xl'>
               <div className='text-purple-400'>
                  total bill
                  <span className='text-white text-lg'>
                     {JSON.parse(country)?.currency.symbol_native
                        ? JSON.parse(country)?.currency.symbol_native
                        : JSON.parse(country)?.currency.code}{' '}
                     {total}
                  </span>
               </div>
               <div className='w-full h-[50%] flex justify-center space-x-5'>
                  <Button
                     clickEvent={refreshPage}
                     additionalStyle={
                        'border-2 border-violet-300 text-violet-300'
                     }
                  >
                     new {text}
                  </Button>

                  <Button
                     clickEvent={renderPdf}
                     additionalStyle={'bg-violet-900 text-white'}
                  >
                     preview {text}
                  </Button>

                  <Button
                     clickEvent={renderPdf}
                     mode={'download'}
                     additionalStyle={
                        'bg-black text-purple-300 border-2 border-purple-300'
                     }
                  >
                     download {text}
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
};
export default FinalSplitPage;
