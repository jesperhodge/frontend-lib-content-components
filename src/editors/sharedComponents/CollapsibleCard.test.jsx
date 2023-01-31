import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleCard from './CollapsibleCard';

describe('CollapsibleCard', () => {
  describe('default with children', () => {
    const children = (<h1>My test content</h1>);
    test('snapshot: renders correct', () => {
      expect(shallow(<CollapsibleCard title="Settings Option Title" summary="Settings Option Summary">{children}</CollapsibleCard>)).toMatchSnapshot();
    });
  });
  describe('with additional sections', () => {
    const children = (<h1>First Section</h1>);
    const sections = [<h1>Second Section</h1>, <h1>Third Section</h1>];
    test('snapshot: renders correct', () => {
      expect(shallow(
        <CollapsibleCard title="Settings Option Title" summary="Settings Option Summary" extraSections={sections}>
          {children}
        </CollapsibleCard>,
      )).toMatchSnapshot();
    });
  });
});
