import React from 'react';
import { formatMessage } from '../../../../../../../testUtils';
import { ProblemTypeKeys } from '../../../../../../data/constants/problem';

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
  <button type="button" onClick={onClick}>{children}</button>
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

  it('renders a hint', async () => {
  });

  it('renders no hints', async () => {
  });

  it('adds a hint', async () => {
    // just test that reducer is called
  });

  it('deletes a hint', () => {
    // won't implement now
  });

  it('changes summary if the number of hints changes', () => {
  });
});
