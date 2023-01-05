import { IntlProvider } from '@edx/frontend-platform/i18n';
import React from 'react';

import { RawEditor } from '.';

export default {
    title: 'Raw Editor',
    component: RawEditor,
}

const props = {
    editorRef: {
      current: {
        value: 'Ref Value',
      },
    },
    text: { data: { data: 'eDiTablE Text' } },
  };

export const Default = () => <IntlProvider locale="en" messages={{}}><RawEditor {...props} /></IntlProvider>;