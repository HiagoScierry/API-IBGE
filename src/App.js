import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [uf, setUF] = useState([]);
  const [city, setCity] = useState([]);
  const [currentUF, setCurrentUF] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [initial, setInitial] = useState("");

  const getDataUF = async () => {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    setUF(response.data);
  };

  const getDataCity = async () => {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${initial}/municipios`
    );
    setCity(response.data);
  };

  useEffect(() => {
    getDataUF();
    console.clear();
  }, []);

  useEffect(() => {
    const currentDataUF = uf.filter(index => {
      if (currentUF === index.nome) {
        return index;
      }
    });
    if (currentDataUF.length > 0) {
      setInitial(currentDataUF[0].sigla);
    }
  }, [uf, currentUF]);

  useEffect(() => {
    getDataCity();
  }, [initial]);

  return (
    <div className="App">
      <div className="alinhamento">
        <p>Estado : </p>
        <select value={currentUF} onChange={e => setCurrentUF(e.target.value)}>
          {uf.map(index => {
            return <option key={index}> {index.nome} </option>;
          })}
        </select>
      </div>
      <div className="alinhamento">
        <p>Cidade : </p>
        <select
          value={currentCity}
          onChange={e => setCurrentCity(e.target.value)}
        >
          {city.map(index => {
            return <option key={index}> {index.nome} </option>;
          })}
        </select>
      </div>

      <p>O estado escolhido : {currentUF} </p>
      <p>A cidade escolhida : {currentCity}</p>
    </div>
  );
}
