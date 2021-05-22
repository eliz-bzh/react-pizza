import { Cart, Home } from './pages';
import { Route } from 'react-router-dom';
import { Header } from './components';

const App = () => {

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
