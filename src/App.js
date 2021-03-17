import './App.css';
import { useState } from "react";
import { compressTrie } from "./compressTrie";
import { decompress } from "./decompress";

function App() {
  const [ source, setSource ] = useState('')
  const [ compressed, setCompressed ] = useState('');
  const [ outData, setOutData ] = useState();
  const [ dict, setDict ] = useState();
  const [ outIArray, setOutIArray] = useState();
  const [ decompressed, setDecompressed] = useState();
  const [ error, setError ] = useState();
  
  const [ decFullOut, setDecFullOut ] = useState();
  const [ dictionary, setDictionary ] = useState();
  
  
  const handleChange = (event) => {
    setSource(event.target.value);
    try {
      const [ compressed, outData, dict, outIArrayA ] = compressTrie(event.target.value)
      setOutData(outData)
      setDict(dict)
      setCompressed(compressed);
      setOutIArray(outIArrayA)
      const [ output, fullOut, dictionary ] = decompress(compressed);
      setDictionary(dictionary)
      setDecFullOut(fullOut)
      setDecompressed(output);
      setError(undefined);
    } catch (err) {
      setError(err)
    }
  }
  
  return (
    <div className="App">
      <h4>Input string to decode</h4>
      <input value={source} onChange={handleChange} />
      
      <h4>Compressed numbers:</h4>
      <p>{compressed ?? ''} ({(outIArray ?? []).join(',')})</p>
  
      <h4>Decompressed numbers:</h4>
      <p>{decompressed ?? ''}</p>
  
      <h4>Error:</h4>
      <p>{error?.message ?? ''}</p>
      
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <table>
        <thead>
          <tr>
            <th>На шаге</th>
            <th>Исходная подстрока</th>
            <th>Код</th>
            <th>Разряд. словаря</th>
            <th>Двоичный</th>
          </tr>
        </thead>
        <tbody>
          {outData && outData.map(({ output, dictSize, binary, nextChar, source}, i) => <tr key={i}><td>{nextChar}</td><td>{source}</td><td>{output}</td><td>{dictSize}</td><td>{binary}</td></tr>)}
        </tbody>
      </table>
      <table>
        <thead>
        <tr>
          <th>key</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody>
          {dict && dict.map(([key, value]) => <tr key={key}><td>{key}</td><td>{value}</td></tr>)}
        </tbody>
      </table>
      <table>
        <thead>
        <tr>
          <th>binary</th>
          <th>code</th>
          <th>output</th>
        </tr>
        </thead>
        <tbody>
          {decFullOut && decFullOut.map(({ binary, code, output}, index) => <tr key={index}><td>{binary}</td><td>{code}</td><td>{output}</td></tr>)}
        </tbody>
      </table>
      <table>
        <thead>
        <tr>
          <th>key</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody>
        {dictionary && dictionary.map(({ key, value }, index) => <tr key={index}><td>{key}</td><td>{value}</td></tr>)}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
