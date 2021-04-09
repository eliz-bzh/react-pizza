import { Cart, Home } from './pages';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { useEffect } from 'react';
import axios from 'axios';
import { setPizzas } from './redux/actions/actionPizzas';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

function App({ setPizzas, items }) {

  useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        setPizzas(data.pizzas);
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path='/' render={() => <Home items={items} />} />
        <Route exact path='/cart' component={Cart} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    items: state.pizzasReducer.items,
    filters: state.filtersReducer
  };
};

/*const mapDispatchToProps = dispatch => {
  return { setPizzas: (items) => dispatch(setPizzasAction(items)) };
};*/

const mapDispatchToProps = {
  setPizzas
};
//connect transfer dispatch as props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
