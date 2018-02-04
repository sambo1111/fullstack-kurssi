import React from 'react';
import axios from 'axios';
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  componentWillMount() {
    console.log('mount')
    personService
      .getAll()
      .then(response => {
        this.setState({
          persons: response.data
        })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.newName === '' || this.state.newNumber === '') {
      return null
    }

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (this.state.persons.map(p => p.name).includes(this.state.newName)) {
        if (window.confirm("This person already exists. Do you want to update number?")) {
          newPerson.id = this.state.persons.find(p => p.name === newPerson.name).id
          personService
          .update(newPerson)
          .then(response => {
            this.setState({
              newName: '',
              newNumber: '',
              persons: this.state.persons.map(p => p.id !== newPerson.id ? p : newPerson),
              notification: `Updated number for '${newPerson.name}'`
            })
            setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
          })
          .catch(() => {
            personService
            .create(newPerson)
            .then(response => {
              this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: '',
                notification: `New number added for contact '${newPerson.name}'`
              })
              setTimeout(() => {
              this.setState({notification: null})
            }, 5000)
            })
          })
        }

    } else {

      personService
      .create(newPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: '',
          notification: `New number added for contact '${newPerson.name}'`
        })
        setTimeout(() => {
        this.setState({notification: null})
      }, 5000)
      })
    }
  }

  removePerson = (id) => {
      return () => {
        if (window.confirm("Do you want to delete this?")) {
          personService
          .remove(id)
          .then (() => {
            const persons = this.state.persons.filter(p => p.id !== id)
            this.setState({
              persons: persons,
              notification: 'Contact deleted'
            })
            setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
          })
        }
        }
  }

  handlePersonChange = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNumberChange = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Notification notification={this.state.notification} />
        <FilterForm state={this.state} handleFilterChange={this.handleFilterChange}/>
        <AddPersonForm  state={this.state}
                        addPerson={this.addPerson}
                        handlePersonChange={this.handlePersonChange}
                        handleNumberChange={this.handleNumberChange} />
        <ShowNumbers state={this.state} removePerson={this.removePerson}/>
      </div>
    )
  }
}

const ShowNumbers = ({state, removePerson}) => {
  const filtered = state.persons.filter(p => p.name.toLowerCase().includes(state.filter.toLowerCase()))
  return (
    <div>
      <h2>Numerot</h2>
      {filtered.map(p => <div key={p.name}>
                          {p.name} {p.number}
                          <button onClick={removePerson(p.id)}> poista </button>
                          </div>)}
    </div>
  )
}

const FilterForm = ({state, handleFilterChange}) => {
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          rajaa näytettäviä <input value={state.filter} onChange={handleFilterChange}/>
        </div>
      </form>
    </div>
  )
}

const AddPersonForm = ({state, addPerson, handlePersonChange, handleNumberChange}) => {
  return (
    <div>
      <h3> Lisää uusi </h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={state.newName} onChange={handlePersonChange}/>
        </div>
        <div>
          numero: <input value={state.newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

const Notification = ({notification}) => {
  if (notification == null) {
    return null
  }
  return(
    <div className="notification">
      {notification}
    </div>
  )
}

export default App
