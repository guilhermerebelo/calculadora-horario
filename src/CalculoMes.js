import { useEffect, useState } from 'react';
import './App.css';

function CalculoMes() {
  const [minutos, setMinutos] = useState();
  const [horas, setHoras] = useState();

  const change = (ev) => {
    let value = ev.target.value;

    if (!value) {
      return;
    }

    const array = JSON.parse(value);

    if (typeof array !== "object") {
      throw("Objeto não é um array");
    }

    const resultado = calcular(array);

    setMinutos(resultado);
    setHoras(parseToHour(resultado));
  }

  function calcular(array) {
    return array
      .map(hora => parseToMinutes(hora))
      .map(minutos => parseInt(minutos))
      .reduce((total, numero) => total + numero, 0)
      .toString();
  }

  const parseToHour = (minutos) => {
    const sinal = minutos[0] === "-" && "-";
    
    if (sinal) {
      minutos = minutos.substr(1);
      return sinal + Math.floor(minutos / 60) + ':' + minutos % 60;
    }

    return Math.floor(minutos / 60) + ':' + minutos % 60;
  }
  
  const parseToMinutes = (dataFormat) => {
    const sinal = dataFormat[0] === "-" && "-";

    if (sinal) {
      dataFormat = dataFormat.substr(1);
      return "-" + (dataFormat.split(':').reduce((acc,time) => (60 * acc) + +time));
    }

    return (dataFormat.split(':').reduce((acc,time) => (60 * acc) + +time)).toString();
  }


  return (
    <>
        <div className="card">
          <div className="card-body">

          <label><h4>Somar array com sobras do mês</h4></label> <br/>
          <input style={{width: "800px", borderRadius: "4px"}}  onBlur={change}></input>

          <br/><br/>
          <h4>
            Resultado em minutos: {minutos} <br/>
            Resultado em horas: {horas}
          </h4>
            
          </div>
        </div>
    </>
  );
}

export default CalculoMes;