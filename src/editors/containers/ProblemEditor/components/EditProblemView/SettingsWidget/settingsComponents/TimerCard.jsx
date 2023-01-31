import React from 'react';
import { injectIntl, FormattedMessage, intlShape } from '@edx/frontend-platform/i18n';
import { Form } from '@edx/paragon';
import PropTypes from 'prop-types';
import CollapsibleCard from '../../../../../../sharedComponents/CollapsibleCard';
import messages from '../messages';
import { timerCardHooks } from '../hooks';

export const TimerCard = ({
  timeBetween,
  updateSettings,
  // inject
  intl,
}) => {
  const { handleChange } = timerCardHooks(updateSettings);

  return (
    <CollapsibleCard
      title={intl.formatMessage(messages.timerSettingsTitle)}
      summary={intl.formatMessage(messages.timerSummary, { time: timeBetween })}
    >
      <div className="spacedMessage">
        <span>
          <FormattedMessage {...messages.timerSettingText} />
        </span>
      </div>
      <Form.Group>
        <Form.Control
          type="number"
          value={timeBetween}
          onChange={handleChange}
          floatingLabel={intl.formatMessage(messages.timerInputLabel)}
        />
      </Form.Group>
    </CollapsibleCard>
  );
};

TimerCard.propTypes = {
  timeBetween: PropTypes.number.isRequired,
  updateSettings: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TimerCard);
