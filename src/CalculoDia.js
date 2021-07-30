import moment from 'moment';
import { useState } from 'react';
import './App.css';

const PATTERN_HOUR = "hh:mm";
const OITO_HORAS_EM_MINUTOS = 480;


function CalculoDia() {
  const [minutos, setMinutos] = useState();
  const [horas, setHoras] = useState();

  const change = (ev) => {
    let value = ev.target.value;

    if (!value) {
      return;
    }

    const array = JSON.parse(value);

    if (typeof array !== "object") {
      throw ("Objeto não é um array");
    }

    const resultado = calcular(array);

    setHoras(parseToHour(resultado));
    setMinutos(resultado - OITO_HORAS_EM_MINUTOS);
  }

  function calcular(array) {
    const primeiraEntrada = moment(array[0], PATTERN_HOUR);
    const primeiraSaida = moment(array[1], PATTERN_HOUR);
    const segundaEntrada = moment(array[2], PATTERN_HOUR);
    const segundaSaida = moment(array[3], PATTERN_HOUR);

    const manha = moment.duration(primeiraSaida.diff(primeiraEntrada)).asMinutes()
    const tarde = moment.duration(segundaSaida.diff(segundaEntrada)).asMinutes()

    return manha + tarde;
  }

  const parseToHour = (minutos) => {
    return Math.floor(minutos / 60) + ':' + minutos % 60;
  }

  return (
    <>
      <div className="card">
        <div className="card-body">

          <label><h4>Somar array com entradas e saídas do dia</h4></label> <br />
          <input style={{ width: "800px", borderRadius: "4px" }} onBlur={change}></input>

          <br /><br />
          <h4>
            Total trabalhado: {horas} <br/>
            Resultado do dia (8 horas): {minutos}
          </h4>

        </div>
      </div>
    </>
  );
}

export default CalculoDia;