/* eslint-disable react/prop-types */
const Button = ({ children, clickEvent, additionalStyle, mode }) => {
   return (
      <button
         className={`w-24 h-full rounded-lg hover:scale-105 text-xs font-bold ${additionalStyle}`}
         onClick={mode ? () => clickEvent('download') : clickEvent}
      >
         {children}
      </button>
   );
};
export default Button;
