import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const menuStyle = {
  color: '#ECF8E0',
  borderStyle: 'solid',
  borderColor: '#A9F5A9',
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: '#E0F8E0',
  borderRadius: 3
}

const Menu = ({ anecdotes, addNew }) => (

  <div>
    <Router>
      <div>
      <h1>Software anecdotes</h1>
        <div style={menuStyle}>
          <em><NavLink to='/anecdotes'>anecdotes</NavLink> </em>
          <em><NavLink to='/new'>create new</NavLink> </em>
          <em><NavLink to='/about'>about</NavLink> </em>
        </div>
        <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/new" render={({ history }) => <CreateNew history={history} addNew={addNew} />} />
        <Route path="/about" render={() => <About />} />
        <Route exact path="/anecdotes/:id" render={({ match }) => <OneAnecdote anecdote={anecdoteById(match.params.id, anecdotes)} />} />
      </div>
    </Router>
  </div>
)

const anecdoteById = (id, anecdotes) => {
  return anecdotes.find(a => a.id === id)
}

const OneAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h1> {anecdote.content} </h1>
      <div> votes {anecdote.votes} </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link> 
          <span className="badge badge-default badge-pill">{anecdote.votes}</span> 
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={6} md={4}>
          <Image src="https://www.princeton.edu/turing/images/turing_400.jpg" />
        </Col>
      </Row>
    </Grid>
  </div>
)

const footerStyle = {
  border: 'solid',
  borderColor: '#A9F5BC',
  borderWidth: 'medium',
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 5,
  textAlign: 'center',
  borderRadius: 2,
  background: '#CEF6E3',
  marginTop: 10
}

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    const newAnecdoteContent = this.state.content
    this.setState({
      content: '',
      author: '',
      info: ''
    })

    this.props.history.push('/anecdotes')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel> Content: </ControlLabel>
            <FormControl
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel> Author: </ControlLabel>
            <FormControl
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel> Url: </ControlLabel>
            <FormControl
              type="text"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button bsStyle="success" type="submit"> Create </Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

const Notification = ({ notification, display }) => {
  const notificationStyle = {
    color: 'green',
    borderStyle: 'solid',
    display: display,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginReft: 10,
    paddingLeft: 500,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E0F8E0',
    borderRadius: 25
  }

  return (
    <div style={notificationStyle}> {notification} </div>
  )

}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 4,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 6,
          id: '2'
        }
      ],
      notification: '',
      displayNotification: 'none'
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `Added new anecdote: ${anecdote.content}`,
      displayNotification: 'block'
    })
    setTimeout(() => {
      this.setState({
        notification: '',
        displayNotification: 'none'
      })
    }, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  showNotification = () => {
    return (
      <div> {this.state.notification} </div>
    )
  }

  render() {
    return (
      <div className="container">
        <Notification notification={this.state.notification} display={this.state.displayNotification} />
        <Menu addNew={this.addNew} anecdotes={this.state.anecdotes} notification={this.state.notification} />
        <Footer />
      </div>
    );
  }
}

export default App;
