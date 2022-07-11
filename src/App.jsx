import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

function App() {
  console.log(store.getState());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>root component</>
      </PersistGate>
    </Provider>
  )
}

export default App
