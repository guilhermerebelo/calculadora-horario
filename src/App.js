import { useEffect, useState } from 'react';
import './App.css';
import CalculoDia from './CalculoDia';
import CalculoMes from './CalculoMes'

function App() {

  return (
    <>
      <div style={{margin: "30px 40px"}}> 
        <h2>Utilitário de horas</h2> <br/>


        <CalculoMes/>

        <br/><br/>

        <CalculoDia/>
        
      </div>
    </>
  );
}

export default App;
