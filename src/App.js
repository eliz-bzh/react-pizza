import { Cart, Home } from './pages';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setPizzas(data.pizzas);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path='/' render={() => <Home items={pizzas} />} />
        <Route exact path='/cart' component={Cart} />
      </div>
    </div>
  );
}

export default App;
