import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0,
      yhteensa: 0
      }
    }

    asetaArvoon = (s,arvo) => {
      return () => {
        if (s === "hyva") {
          this.setState({
            hyva: arvo
          })
        } else if (s === "neutraali") {
          this.setState({
            neutraali: arvo
          })
        } else {
          this.setState({
            huono: arvo
          })
        }
        this.setState({
          yhteensa:this.state.yhteensa+1
        })
      }
    }

    render() {
      return(
        <div>
          <h1> Anna palautetta </h1>
          <div>
            <Button paina={this.asetaArvoon("hyva", this.state.hyva + 1)} name="hyvä"/>
            <Button paina={this.asetaArvoon("neutraali", this.state.neutraali + 1)} name="neutraali"/>
            <Button paina={this.asetaArvoon("huono", this.state.huono + 1)} name="huono"/>
          </div>
            <h1> Statistiikka </h1>
            <Statistics stats={this.state} />
        </div>
      )
    }
}

const Button = (p) => {
  return (
    <button onClick={p.paina}>{p.name}</button>
  )
}

const Statistics = (p) => {
  if (p.stats.yhteensa === 0) {
    return (
      <div> Yhtään palautetta ei ole annettu. </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic name="hyvä" stat={p.stats.hyva} />
        <Statistic name="neutraali" stat={p.stats.neutraali} />
        <Statistic name="huono" stat={p.stats.huono} />
        <Statistic name="keskiarvo" stat={<Average stats={p.stats}/>}/>
        <Statistic name="positiivista" stat={<Positive stats={p.stats}/>}/>
      </tbody>
    </table>
  )
}

 const Statistic = (p) => {
   return (
     <tr>
      <td>{p.name}</td><td>{p.stat}</td>
     </tr>
   )
 }

 const Average = (p) => {
   return(
     Math.round((p.stats.hyva + p.stats.huono * (-1))/(p.stats.yhteensa)*100)/100
   )
 }

 const Positive = (p) => {
   return (
     Math.round((p.stats.hyva/(p.stats.yhteensa))*100)/100
   )
 }

ReactDOM.render(<App />, document.getElementById('root'));
