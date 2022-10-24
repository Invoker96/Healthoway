import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import App from './App';
import './index.css';
import English from './translations/en.json';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const locale = navigator.language;

root.render(
  <IntlProvider locale={locale} messages={English}>
    <App />
  </IntlProvider>
);
