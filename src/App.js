import { Cart, Home } from './pages';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { useEffect } from 'react';
import axios from 'axios';
import { setPizzas } from './redux/actions/actionPizzas';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  window.test = () => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        //console.log(data.response.data); //пицца лиссица
        dispatch(setPizzas(data.pizzas));
      })
  }

  useEffect(() => {
    //https://pzz.by/api/v1/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc //пицца лиссица
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        //console.log(data.response.data); //пицца лиссица
        dispatch(setPizzas(data.pizzas));
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
      </div>
    </div>
  );
}
/*
const mapStateToProps = state => {
 return {
   items: state.pizzasReducer.items,
   filters: state.filtersReducer
 };
};

const mapDispatchToProps = dispatch => {
 return { setPizzas: (items) => dispatch(setPizzasAction(items)) };
};

const mapDispatchToProps = {
 setPizzas
};
*/
//connect transfer dispatch as props
export default App;
