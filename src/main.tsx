import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider 
  domain='dev-bpz3fesbt2epuh37.us.auth0.com'
  clientId='V4XFr7MKz7VtTlvNC9CX4UtkycA4tmL1'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </Provider>
</Auth0Provider>
)
