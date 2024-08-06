import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MembersProvider } from './contexts/MembersContext.jsx';
import { BillProvider } from './contexts/BillContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <MembersProvider>
      <BillProvider>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </BillProvider>
   </MembersProvider>
);
