import { deepPurple, lightBlue } from '@mui/material/colors';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import App from './App';
import './index.css';
import English from './translations/en.json';
import variables from './variables.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const locale = navigator.language;

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    },
    secondary: {
      main: lightBlue[100]
    }
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 300,
      color: variables.GREY_03
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }
  }
});

root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={English}>
        <App />
      </IntlProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
