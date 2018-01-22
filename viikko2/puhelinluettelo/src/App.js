import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '0402932812' },
        { name: 'Jari Sillanpää', number: '050298232' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
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
    const persons = this.state.persons.concat(newPerson)
    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
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
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}/>
          </div>
        </form>
        <h3> Lisää uusi </h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handlePersonChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Show state={this.state} />
      </div>
    )
  }
}

const Show = ({state}) => {
  const filtered = state.persons.filter(p => p.name.toLowerCase().includes(state.filter))
  return (
    <div>
      {filtered.map(p => <li key={p.name}> {p.name} {p.number}</li>)}
    </div>
  )
}

export default App
