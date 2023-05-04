import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Container,
  Icon,
  IconButton,
} from '@edx/paragon';
import { DeleteOutline } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import messages from '../messages';
import ExpandableTextArea from '../../../../../../sharedComponents/ExpandableTextArea';

export const HintRow = ({
  value,
  handleChange,
  handleDelete,
  id,
  // injected
  intl,
}) => (
  <ActionRow className="mb-4">
    <Container fluid className="p-0">
      <ExpandableTextArea
        value={value}
        setContent={handleChange}
        placeholder={intl.formatMessage(messages.hintInputLabel)}
        id={`hint-${id}`}
      />
    </Container>
    <div className="d-flex flex-row flex-nowrap">
      <IconButton
        src={DeleteOutline}
        iconAs={Icon}
        alt={intl.formatMessage(messages.settingsDeleteIconAltText)}
        onClick={handleDelete}
        variant="primary"
      />
    </div>
  </ActionRow>
);

HintRow.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(HintRow);
