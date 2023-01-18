import React from 'react';

import { RawEditor } from '.';

export default {
  title: 'Raw Editor',
  component: RawEditor,
};

const props = {
  editorRef: {
    current: {
      value: 'Ref Value',
    },
  },
  content: { data: { data: 'eDiTablE Text' } },
};

export const Default = () => <RawEditor {...props} />;
