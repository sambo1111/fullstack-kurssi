import React from 'react';
import axios from 'axios';
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
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

    if (this.state.persons.map(p => p.name).includes(this.state.newName)) {
      return (
        alert("This person already exists.")
      )
    }
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      })
  }

  removePerson = (event) => {
    personService
      .remove(event.target.value)
      .then (removedPerson => {
        const persons = this.state.persons.filter(p => p.id == removedPerson.id)
        this.setState({
          persons: persons
        })
      })
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
                          <button onClick={removePerson.bind(p.id)}> poista </button>
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

export default App
