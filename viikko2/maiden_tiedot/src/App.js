import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      clickedName: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      this.setState({
        countries: response.data
      })
    })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleClickName = (event) => {
    this.setState({

    })
  }

  render() {
    return (
      <div>
        <ShowSearchBox countries={this.state.countries} filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <ShowCountries countries={this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))} handleClickName={this.handleClickName} />
      </div>
    )
  }
}

const ShowSearchBox = ({countries, filter, handleFilterChange}) => {
  return (
    <form>
      <input value={filter} onChange={handleFilterChange}/>
    </form>
  )
}

const ShowCountries = ({countries, handleClickName}) => {
 if (countries.length === 1) {
  return (
    <div>
      <ShowOneCountry country={countries[0]} />
    </div>
  )
} else if (countries.length > 0) {
    console.log(countries.length)
    return (
      <div>
        {countries.map(c => <div key={c.name}>{c.name}</div>)}
      </div>
    )
}
  return (
    <div></div>
  )
}

const ShowOneCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital} </div>
      <div>population: {country.population} </div>
      <div> <img src={country.flag}/> </div>
    </div>
  )
}

export default App
