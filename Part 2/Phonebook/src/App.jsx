import {useState} from "react"
import Filter from "./filter"
import PersonForm from "./personForm"
import Persons from "./persons"

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-123456"},
    {name: "Ada Lovelace", number: "39-44-5323523"}
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(p => p.name === newName)

    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName("")
    setNewNumber("")
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} setSearch={setSearch}/>

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
