import {useState, useEffect} from "react"
import personsService from "./services/persons"
import Filter from "./filter"
import PersonForm from "./personForm"
import Persons from "./persons"
import Notification from "./components/notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    personsService.getAll().then(data => {setPersons(data)})
  },[])

  const showMessage = (text, type = "success") => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (!window.confirm(`${newName} is already added. Replace number?`)) {
        return
      }

      const updatedPerson = { ...existing, number: newNumber}

      personsService
        .update(existing.id, updatedPerson)
        .then(returned => {
          setPersons(persons.map(p => p.id !== existing.id ? p : returned))
          showMessage(`Updated ${returned.name}`)
        })
        .catch(() => {
          showMessage(
            `Information of ${existing.name} was already removed from server`,
            "error"
          )
          setPersons(persons.filter(p => p.id !== existing.id))
        })

      setNewName("")
      setNewNumber("")
      return
    }

    personsService
      .create({name: newName, number: newNumber})
      .then(returned => {
        setPersons(persons.concat(returned))
        showMessage(`Added ${returned.name}`)
        setNewName("")
        setNewNumber("")
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showMessage(`Deleted ${person.name}`)
      })
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType}/>

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

      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
