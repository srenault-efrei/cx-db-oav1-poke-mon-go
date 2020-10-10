import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pokemons from './components/Pokemons'
import EditPokemon from './components/EditPokemon'
import ShowPokemon from './components/ShowPokemon'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' >
            <Pokemons />
          </Route>
          <Route path='/pokemons/show/:id'>
            <ShowPokemon />
          </Route>
          <Route path='/pokemons/edit/:id'>
            <EditPokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
