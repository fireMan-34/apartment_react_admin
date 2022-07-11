import 'antd/dist/antd.css'

import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

function App() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
