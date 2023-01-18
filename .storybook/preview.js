import React from 'react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { Provider } from 'react-redux';
// eslint-disable-next-line
import store from '../src/editors/data/store';

import messages from './i18n';
import './index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <IntlProvider locale="en" messages={messages}>
      <Provider store={store}>
        <div className="editor-gallery">
          <Story />
        </div>
      </Provider>
    </IntlProvider>
  ),
];
