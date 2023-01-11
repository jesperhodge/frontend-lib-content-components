import React from 'react';
import { shallow } from 'enzyme';

import { RawEditor } from '.';

describe('RawEditor', () => {
  const props = {
    editorRef: {
      current: {
        value: 'Ref Value',
      },
    },
    content: { data: { data: 'eDiTablE Text' } },
  };
  test('renders as expected with default behavior', () => {
    expect(shallow(<RawEditor {...props} />)).toMatchSnapshot();
  });
});
