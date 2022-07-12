import 'antd/dist/antd.css'

import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

console.log(import.meta.env.VITE_BASE_URL);

function App() {
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
