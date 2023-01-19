import React from 'react';

import FeedbackControl from './FeedbackControl';

export default {
  title: 'FeedbackControl',
  component: FeedbackControl,
};

const answerWithFeedback = {
  id: 'A',
  title: 'Answer 1',
  correct: true,
  selectedFeedback: 'some feedback',
  unselectedFeedback: 'unselectedFeedback',
};

const props = {
  answer: answerWithFeedback,
  setAnswer: () => {},
  feedback: 'feedback',
  onChange: () => {},
  labelMessage: 'msg',
  labelMessageBoldUnderline: 'msg',
};

export const Default = () => <FeedbackControl {...props} />;
