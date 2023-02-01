import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleCard from './index';
import { render, screen, findByText } from '@testing-library/react';
import { useCollapsible } from './hooks';
import '@testing-library/jest-dom';

const MockComponent = () => {
  return <div><p>Text</p></div>;
}

const Card = () => <MockComponent />;
Card.Section = () => <MockComponent />;

jest.mock('./CardSection', () => () => <MockComponent />);
jest.mock('@edx/paragon', () => ({
  __esModule: true,
  Collapsible: {
    Advanced: () => <MockComponent />,
    Visible: () => <MockComponent />,
    Trigger: () => <MockComponent />,
  },
  Icon: () => <MockComponent />,
  Card,
}));
jest.mock('@edx/paragon/icons', () => ({
  __esModule: true,
  KeyboardArrowUp: () => <MockComponent />,
  KeyboardArrowDown: () => <MockComponent />,
}));

describe('CollapsibleCard', () => {
  describe('default with children', () => {
    const children = (<h1>My test content</h1>);
    test('snapshot: renders correct', () => {
      expect(shallow(<CollapsibleCard title="Settings Option Title" summary="Settings Option Summary">{children}</CollapsibleCard>)).toMatchSnapshot();
    });
    test('opens', () => {
      render(<CollapsibleCard title="Settings Option Title" summary="Settings Option Summary">{children}</CollapsibleCard>);
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
    test('MockComponent', () => {
      render(<MockComponent />);
      expect(screen.getByText('Text')).toBe('Text');
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
