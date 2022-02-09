import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications';
import {ErrorBoundary} from 'react-error-boundary';

import { store } from './actions/store';
import Ship from './components/ship';
import { ErrorHandler } from './components/error-handler';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Ship />
          </ErrorBoundary>
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
