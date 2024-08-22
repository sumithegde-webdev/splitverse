import{u as f,a as p,r as m,j as e}from"./index-DusV_0oC.js";const j=({setAddBillItem:s,editItem:l={},setEditItem:c})=>{const{members:r}=f(),{onAddItem:d,onEditItem:u}=p(),[a,i]=m.useState(l.itemId?l.membersForTheSplit:[]),[n,w]=m.useState({}),[h,v]=m.useState(l.itemId?l.itemName:""),[x,y]=m.useState(l.itemId?Number(l.totalPrice):0);function g(t){const o=t.target.value;t.target.id==="selectAll"?t.target.checked===!0?(i(r.map(b=>b.name)),t.target.checked=!t.target.checked):(i([]),t.target.checked=!0):t.target.checked?i([...a,o]):i(a.filter(b=>b!==o))}function N(t){t.preventDefault();let o={};h.trim()||(o.itemNameError="name cannot be empty"),x===0&&(o.itemPriceError="price cannot be 0"),a.length===0&&(o.membersError="select atleast one member for the split"),Object.keys(o).length===0&&!l.itemId?(d(t,{itemId:h.toLowerCase().concat(new Date().getTime()),itemName:h.toLowerCase(),totalPrice:Math.abs(Number(x)),membersForTheSplit:a,pricePerHead:Number((x/a.length).toFixed(3))}),s(!1)):Object.keys(o).length===0&&l.itemId?(u(t,l.itemId,{itemName:h.toLowerCase(),totalPrice:Math.abs(Number(x)),membersForTheSplit:a,pricePerHead:Number((x/a.length).toFixed(3))}),c({}),s(!1)):(w(o),setTimeout(()=>{w({})},2e3))}return e.jsxs("div",{className:"absolute z-30 w-full h-full flex flex-col space-y-5 bg-[#222]",children:[e.jsx("input",{type:"text",placeholder:n.itemNameError?`${n.itemNameError}`:"enter the item name",value:h,onChange:t=>{v(t.target.value)},className:`mx-auto p-3 bg-transparent w-full max-w-[450px] h-[50px] border-2 ${n.itemNameError?"border-red-400 placeholder:text-red-400":"border-violet-400"} outline-none rounded-md text-lg`}),e.jsx("input",{type:"number",min:0,placeholder:n.itemPriceError?`${n.itemPriceError}`:"enter the item price",value:Number(x),onChange:t=>{y(Number(t.target.value))},className:`mx-auto p-3 bg-transparent w-full max-w-[450px] h-[50px] border-2 ${n.itemPriceError?"border-red-400 placeholder:text-red-400":"border-violet-400"} outline-none rounded-md text-lg`}),e.jsxs("div",{className:"mx-auto w-full max-w-[300px] h-[250px] flex flex-col space-y-4 overflow-y-auto",children:[e.jsxs("div",{className:`mx-auto w-full h-[45px] flex items-center justify-center border ${n.membersError?"border-red-400":"border-white"} rounded-lg hover:bg-purple-400`,children:[e.jsx("div",{className:"w-1/5 h-full flex items-center justify-center",children:e.jsx("input",{type:"checkbox",id:"selectAll",className:"w-[20px]",name:"all",value:`${r}`,checked:a.length===r.length,onChange:t=>{g(t)}})}),e.jsx("label",{className:"w-4/5 h-full flex items-center text-lg",htmlFor:"selectAll",children:"select all members"})]}),r.map((t,o)=>e.jsxs("div",{className:`mx-auto w-full h-[45px] flex items-center border ${n.membersError?"border-red-400":"border-white"} rounded-lg hover:bg-purple-400`,children:[e.jsx("div",{className:"w-1/5 h-full flex items-center justify-center",children:e.jsx("input",{type:"checkbox",id:`${t.name}`,className:"w-[20px]",name:`${t.name}`,value:`${t.name}`,checked:a.includes(t.name),onChange:b=>{g(b)}})}),e.jsx("label",{className:"w-4/5 h-full flex items-center text-lg",htmlFor:`${t.name}`,children:t.name})]},o))]}),e.jsxs("div",{className:"relative mx-auto w-full max-w-[450px] h-[50px]",children:[l.itemId?e.jsx("button",{type:"button",className:"absolute h-full w-2/5 max-w-[100px] border hover:bg-green-600 left-0 rounded-md",onClick:t=>{N(t)},children:"edit"}):e.jsx("button",{type:"button",className:"absolute h-full w-2/5 max-w-[100px] border hover:bg-green-600 left-0 rounded-md",onClick:t=>{N(t)},children:"add"}),e.jsx("p",{className:"absolute left-[30%] w-2/5 h-full text-red-400 text-center",children:n.membersError||n.itemNameError||n.itemPriceError}),e.jsx("button",{className:"absolute h-full w-2/5 max-w-[100px] border hover:bg-red-600 right-0 rounded-md",onClick:()=>{l.itemId&&c({}),s(!1)},children:"cancel"})]})]})},k=({item:s,setEditItem:l})=>{const{onDeleteItem:c,country:r}=p();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"mb-3 px-3 pb-2 relative w-full h-fit text-black border-b-2 border-gray-700 flex items-center",children:[e.jsxs("div",{className:"w-4/5 h-full flex flex-col justify-between",children:[e.jsx("div",{className:"pt-1 text-2xl",children:s.itemName.toLowerCase()}),e.jsxs("div",{className:"text-xs italic",children:[s.membersForTheSplit.join(", ")," ",s.membersForTheSplit.length>1?"together owe":"owes"]})]}),e.jsxs("div",{className:"absolute bottom-2 right-2 w-1/5 flex items-end justify-end text-md",children:[JSON.parse(r).currency.symbol_native?JSON.parse(r).currency.symbol_native:JSON.parse(r).currency.code," ",s.totalPrice]}),e.jsx("div",{className:"absolute w-10 h-5 rounded-md top-2 right-10",children:e.jsx("button",{className:"flex items-center justify-center w-full h-full bg-white rounded-full text-black border border-black",onClick:d=>{l(s)},children:"edit"})}),e.jsx("div",{className:"absolute w-5 h-5 rounded-full top-2 right-2",children:e.jsx("button",{className:"flex items-center justify-center w-full h-full bg-red-500 rounded-full text-white",onClick:d=>{window.confirm(`remove ${s.itemName}(${JSON.parse(r).currency.symbol_native?JSON.parse(r).currency.symbol_native:JSON.parse(r).currency.code}${s.totalPrice}) from the bill?`)&&c(d,s.itemId)},children:"−"})})]})})},E=({setSplitStage:s})=>{const{defaultTitle:l}=f(),{bill:c}=p();f();const[r,d]=m.useState(!1),[u,a]=m.useState({});return m.useEffect(()=>(document.title="splitverse | bill",function(){document.title=l}),[l]),e.jsxs("div",{className:"absolute flex flex-col justify-between left-[10%] w-4/5 h-2/3 top-[20%]",children:[r&&e.jsx(j,{setAddBillItem:d}),u.itemId&&e.jsx(j,{setAddBillItem:d,editItem:u,setEditItem:a}),!r&&!u.itemId&&(c.length>0?e.jsx("div",{className:"mx-auto p-5 w-full max-w-[600px] h-[75%] max-h-[350px] bg-white rounded-tr-2xl rounded-bl-2xl overflow-y-auto",children:c.map(i=>e.jsx(k,{item:i,setEditItem:a},i.itemId))}):e.jsx("div",{className:"mx-auto p-5 w-full max-w-[600px] h-[75%] max-h-[350px] bg-white rounded-tr-2xl rounded-bl-2xl text-black",children:"recreate the bill, only this time, select members for the split on each item you add."})),!r&&e.jsxs("div",{className:"relative h-[80px] mx-auto w-full max-w-[600px]",children:[e.jsxs("div",{className:"w-full text-center rounded-full italic flex items-center justify-center space-x-2",children:[e.jsx("div",{className:"h-[20px] w-[20px] bg-transparent border border-white rounded-full flex items-center justify-center",children:"!"}),e.jsx("div",{className:"text-xs",children:"can add tax and discount, if any, in the next stage"})]}),c.length>0&&e.jsx("button",{type:"button",className:"absolute bottom-0 left-0 w-2/5 h-[45px] max-w-[200px] bg-black rounded-md hover:bg-purple-400 hover:text-black",onClick:i=>{i.preventDefault(),window.confirm("no further changes to the bill possible, only tax and discount can be added. move on?")&&s("taxAndDiscount")},children:"done"}),e.jsx("button",{type:"button",className:"absolute bottom-0 right-0 text-black w-2/5 max-w-[200px] h-[45px] bg-purple-400 rounded-md hover:text-white",onClick:()=>d(!0),children:"add a new item"})]})]})};export{E as default};
