import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from '../../../../../../../testUtils';
import { HintsCard } from './HintsCard';
import { hintsCardHooks, hintsRowHooks } from '../hooks';
import messages from '../messages';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { ProblemTypeKeys } from '../../../../../../data/constants/problem';

import {IntlProvider} from 'react-intl';
import { object } from 'prop-types';



// jest.mock('../hooks', () => ({
//   hintsCardHooks: jest.fn(),
//   hintsRowHooks: jest.fn(),
// }));

const MockComponent = ({ children }) => (
  <div>{children}</div>
)
jest.mock('../SettingsOption', () => jest.fn(({ children }) => (
  <div>{children}</div>
)))


jest.mock('@edx/frontend-platform/i18n', () => ({
  __esmodule: true,
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  FormattedMessage: jest.fn(({ children }) => (
    <div>{children}</div>
  )),
}))

jest.mock('./HintRow', () => jest.fn(({ value }) => (
  <div className="hint-row">{value}</div>
)));

jest.mock('../../../../../../sharedComponents/Button', () => jest.fn(({ children, onClick }) => (
  <div data-testid="add-button" onClick={() => { console.log(onClick)}}>{children}</div>
)))

const renderWithReactIntl = async (component, locale, messages) => {
  return render(<IntlProvider locale={locale} messages={messages}>
                 {component}
                </IntlProvider>
  );
};

describe('HintsCard', () => {
  const hint1 = { id: '1', value: 'hint1' };
  const hint2 = { id: 2, value: '' };
  const hints0 = [];
  const hints1 = [hint1];
  const hints2 = [hint1, hint2];
  const props = {
    intl: { formatMessage },
    hints: hints0,
    problemType: ProblemTypeKeys.SINGLESELECT,
    updateSettings: jest.fn().mockName('args.updateSettings'),
  };

  // const hintsRowHooksProps = {
  //   handleChange: jest.fn().mockName('hintsRowHooks.handleChange'),
  //   handleDelete: jest.fn().mockName('hintsRowHooks.handleDelete'),
  // };
  // hintsRowHooks.mockReturnValue(hintsRowHooksProps);

  const MyComponent = () => {
    return <p>MyText</p>
  }

  describe('behavior', () => {
    it('tests', () => {
      render(<MyComponent />)
      expect(screen.getByText('MyText')).toBeTruthy()
    })

    it('renders a hint', async () => {
      const { container } = render(<HintsCard {...props} hints={hints1} />);
      expect(screen.getByText('hint1')).toBeDefined();
      expect(container.querySelectorAll('.hint-row').length).toBe(1);

      const addButton = screen.getByTestId('add-button');
      fireEvent.click(addButton);
      await waitFor(() => expect(container.querySelectorAll('.hint-row').length).toBe(2))
      
    });

    it('adds a hint', () => {

    });

    it('deletes a hint', () => {

    });

    it(' calls hintsCardHooks when initialized', () => {
      const hintsCardHooksProps = {
        summary: { message: messages.noHintSummary, values: {} },
        handleAdd: jest.fn().mockName('hintsCardHooks.handleAdd'),
      };

      hintsCardHooks.mockReturnValue(hintsCardHooksProps);
      shallow(<HintsCard {...props} />);
      expect(hintsCardHooks).toHaveBeenCalledWith(hints0, props.updateSettings);
    });
  });

  describe('snapshot', () => {
    test('snapshot: renders hints setting card no hints', () => {
      const hintsCardHooksProps = {
        summary: { message: messages.noHintSummary, values: {} },
        handleAdd: jest.fn().mockName('hintsCardHooks.handleAdd'),
      };

      hintsCardHooks.mockReturnValue(hintsCardHooksProps);
      expect(shallow(<HintsCard {...props} />)).toMatchSnapshot();
    });
    test('snapshot: renders hints setting card one hint', () => {
      const hintsCardHooksProps = {
        summary: {
          message: messages.hintSummary,
          values: { hint: hint1.value, count: 1 },
        },
        handleAdd: jest.fn().mockName('hintsCardHooks.handleAdd'),
      };

      hintsCardHooks.mockReturnValue(hintsCardHooksProps);
      expect(shallow(<HintsCard {...props} hints={hints1} />)).toMatchSnapshot();
    });
    test('snapshot: renders hints setting card multiple hints', () => {
      const hintsCardHooksProps = {
        summary: {
          message: messages.hintSummary,
          values: { hint: hint2.value, count: 2 },
        },
        handleAdd: jest.fn().mockName('hintsCardHooks.handleAdd'),
      };

      hintsCardHooks.mockReturnValue(hintsCardHooksProps);
      expect(shallow(<HintsCard {...props} hints={hints2} />)).toMatchSnapshot();
    });
  });
});
