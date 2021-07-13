import { useEffect, useState } from 'react';
import './App.css';

const HASH_CACHE = 'd41d8cd98f00b204e9800998ecf8427e'

const getCache = () => {
  return window.localStorage.getItem(HASH_CACHE);
}

const saveCache = (valor) => {
  window.localStorage.setItem(HASH_CACHE, valor);

}

function App() {
  const [dias, setDias] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => { setDias(getOrCreateDias()) }, []);
  useEffect(() => { calcular() }, [dias]);

  const change = (ev, index) => {
    dias[index] = parseFloat(ev.target.value);
    setDias(dias);
    calcular();
    saveCache(dias.join(','));
  }

  const calcular = () => {
    let resultado = dias
      .filter(dia => dia)
      .map(valor => valor * 60)
      .reduce((soma, nota) => soma + nota, 0);

    setTotal(resultado / 60);
  }

  const getOrCreateDias = () => {
    let cache = getCache();
    return cache ? cache.split(',') : [...Array(31)];
  }


  return (
    <>
      {dias.map((hora, dia) =>
        <div style={{ marginLeft: '30px' }}>
          <span>{dia + 1}</span>
          <input value={hora} style={{ marginLeft: '30px' }} onChange={(ev) => change(ev, dia)}></input>
        </div>
      )}
      <div>TOTAL: {total || 0} horas</div>
      <button onClick={() => saveCache('')}>limpar cache</button>
      <br />
    </>
  );
}

export default App;
