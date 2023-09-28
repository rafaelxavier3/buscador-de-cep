import { useState } from "react"
import "./style.css"
import { FcSearch } from "react-icons/fc"

import api from "./services/api"

export default function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch() {
    //01001000/json/

    if (input === "") {
      alert("Digite algum CEP!")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("Esse CEP não existe!")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch">
          <FcSearch size={25} onClick={handleSearch} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}
