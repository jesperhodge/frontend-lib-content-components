import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { formatMessage } from '../../../../../../../testUtils';
import { HintsCard } from './HintsCard';
import { ProblemTypeKeys } from '../../../../../../data/constants/problem';

jest.mock('../SettingsOption', () => jest.fn(({ children }) => (
  <div>{children}</div>
)));

jest.mock('@edx/frontend-platform/i18n', () => ({
  __esmodule: true,
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  FormattedMessage: jest.fn(({ children }) => (
    <div>{children}</div>
  )),
}));

jest.mock('./HintRow', () => jest.fn(({ value }) => (
  <div className="hint-row">{value}</div>
)));

jest.mock('../../../../../../sharedComponents/Button', () => jest.fn(({ children, onClick }) => (
  <button type="button" data-testid="add-button" onClick={onClick}>{children}</button>
)));

describe('HintsCard', () => {
  const updateSettings = jest.fn().mockName('args.updateSettings');
  const hint1 = { id: '1', value: 'hint1' };
  const hint2 = { id: 2, value: '' };
  const hints0 = [];
  const hints1 = [hint1];
  const hints2 = [hint1, hint2];
  const props = {
    intl: { formatMessage },
    hints: hints0,
    problemType: ProblemTypeKeys.SINGLESELECT,
    updateSettings,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no hints', async () => {
    const { container } = render(<HintsCard {...props} hints={hints0} />);
    expect(screen.queryByText('hint1')).toBe(null);
    expect(container.querySelectorAll('.hint-row').length).toBe(0);
  });

  it('renders a hint', async () => {
    const { container } = render(<HintsCard {...props} hints={hints1} />);
    expect(screen.getByText('hint1')).toBeDefined();
    expect(container.querySelectorAll('.hint-row').length).toBe(1);
  });

  it('adds a hint', async () => {
    render(<HintsCard {...props} hints={hints1} />);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    await waitFor(() => expect(updateSettings).toHaveBeenCalled());
    expect(updateSettings).toHaveBeenCalled();
  });

  it('deletes a hint', () => {
    // won't implement now
  });

  it('changes summary if the number of hints changes', () => {
    render(<HintsCard {...props} hints={hints1} />);

    expect(screen.getByText('Summary count: 0')).toBeDefined();

    waitFor(() => {
      expect(screen.getByText('Summary count: 1')).toBeDefined();
    });
    expect(screen.getByText('Summary values: hint1')).toBeDefined();

    render(<HintsCard {...props} hints={hints2} />);
    waitFor(() => {
      expect(screen.getByText('Summary count: 1')).toBeDefined();
    });
  });
});
