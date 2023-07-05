import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreHoriz } from '@edx/paragon/icons';

import { thunkActions, selectors } from '../../../../../../data/redux';

import { FileInput, fileInput } from '../../../../../../sharedComponents/FileInput';
import * as module from './TranscriptActionMenu';
import messages from './messages';

export const hooks = {
  replaceFileCallback: ({ language, dispatch }) => (file) => {
    dispatch(thunkActions.video.replaceTranscript({
      newFile: file,
      newFilename: file.name,
      language,
    }));
  },
};

export const TranscriptActionMenu = ({
  index,
  language,
  transcriptUrl,
  launchDeleteConfirmation,
  // redux
  getTranscriptDownloadUrl,
  buildTranscriptUrl,
}) => {
  const input = fileInput({ onAddFile: module.hooks.replaceFileCallback({ language, dispatch: useDispatch() }) });
  const downloadLink = transcriptUrl ? buildTranscriptUrl({ transcriptUrl }) : getTranscriptDownloadUrl({ language });
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-toggle-with-iconbutton-video-transcript-widget"
        as={IconButton}
        src={MoreHoriz}
        iconAs={Icon}
        variant="primary"
        alt="Actions dropdown"
      />
      <Dropdown.Menu className="video_transcript Action Menu">
        <Dropdown.Item
          key={`transcript-actions-${index}-replace`}
          onClick={input.click}
        >
          <FormattedMessage {...messages.replaceTranscript} />
        </Dropdown.Item>
        <Dropdown.Item key={`transcript-actions-${index}-download`} href={downloadLink}>
          <FormattedMessage {...messages.downloadTranscript} />
        </Dropdown.Item>
        <Dropdown.Item key={`transcript-actions-${index}-delete`} onClick={launchDeleteConfirmation}>
          <FormattedMessage {...messages.deleteTranscript} />
        </Dropdown.Item>
      </Dropdown.Menu>
      <FileInput fileInput={input} acceptedFiles=".srt" />
    </Dropdown>
  );
};

TranscriptActionMenu.defaultProps = {
  transcriptUrl: undefined,
};

TranscriptActionMenu.propTypes = {
  index: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  transcriptUrl: PropTypes.string,
  launchDeleteConfirmation: PropTypes.func.isRequired,
  // redux
  getTranscriptDownloadUrl: PropTypes.func.isRequired,
  buildTranscriptUrl: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  getTranscriptDownloadUrl: selectors.video.getTranscriptDownloadUrl(state),
  buildTranscriptUrl: selectors.video.buildTranscriptUrl(state),
});

export const mapDispatchToProps = {
  downloadTranscript: thunkActions.video.downloadTranscript,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TranscriptActionMenu));
