import React from 'react';

import Checker from '.';

export default {
  title: 'Checker',
  component: Checker,
};

export const Default = () => <Checker hasSingleAnswer answer={{ id: 'A', correct: true }} setAnswer={() => {}} />;
