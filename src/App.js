import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store = {store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
