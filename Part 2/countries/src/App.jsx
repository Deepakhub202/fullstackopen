import {useState, useEffect} from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_SOME_KEY 
  //i saw this key on github, it's not my own generated
  // https://gist.github.com/lalithabacies/c8f973dc6754384d6cade282b64a8cb1


  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(res => setCountries(res.data))
  },[])

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const showCountry = (name) => {
    setSearch(name)
  }

  useEffect(() => {
    if (filtered.length === 1) {
      const capital = filtered[0].capital[0]

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(res => setWeather(res.data))
    }
  }, [filtered, apiKey])

  return (
    <div>
      find countries{" "}
      <input value={search} onChange={e => setSearch(e.target.value)}/>

      {filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filtered.length <= 10 && filtered.length > 1 && (
        <ul>
          {filtered.map(c => (
            <li key={c.name.common}>
              {c.name.common}
              <button onClick={() => showCountry(c.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}

      {filtered.length === 1 && (
        <div>
          <h2>{filtered[0].name.common}</h2>
          <p>capital {filtered[0].capital[0]}</p>
          <p>area {filtered[0].area}</p>

          <h3>languages</h3>
          <ul>
            {Object.values(filtered[0].languages).map(l => (
              <li key={l}>{l}</li>
            ))}
          </ul>

          <img src={filtered[0].flags.png} width="150"/>

          {weather && (
            <div>
              <h3>Weather in {filtered[0].capital[0]}</h3>
              <p>temperature {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
