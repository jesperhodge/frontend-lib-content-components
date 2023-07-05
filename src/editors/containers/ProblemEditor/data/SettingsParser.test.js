import { parseScoringSettings, parseSettings, parseShowAnswer } from './SettingsParser';
import {
  checklistWithFeebackHints,
  numericWithHints,
  textInputWithHints,
  singleSelectWithHints,
  negativeAttempts,
} from './mockData/problemTestData';

describe('Test Settings to State Parser', () => {
  test('Test all fields populated', () => {
    const settings = parseSettings(checklistWithFeebackHints.metadata);
    const { hints, ...settingsPayload } = checklistWithFeebackHints.state.settings;
    expect(settings).toStrictEqual(settingsPayload);
  });

  test('Test score settings', () => {
    const scoreSettings = parseScoringSettings(checklistWithFeebackHints.metadata);
    expect(scoreSettings).toStrictEqual(checklistWithFeebackHints.state.settings.scoring);
  });

  test('Test score settings zero attempts', () => {
    const scoreSettings = parseScoringSettings(numericWithHints.metadata);
    expect(scoreSettings).toStrictEqual(numericWithHints.state.settings.scoring);
  });

  test('Test score settings attempts missing', () => {
    const scoreSettings = parseScoringSettings(singleSelectWithHints.metadata);
    expect(scoreSettings.attempts).toStrictEqual(singleSelectWithHints.state.settings.scoring.attempts);
  });

  test('Test negative attempts in score', () => {
    const scoreSettings = parseScoringSettings(negativeAttempts.metadata);
    expect(scoreSettings.attempts).toStrictEqual(negativeAttempts.state.settings.scoring.attempts);
  });

  test('Test score settings missing', () => {
    const settings = parseSettings(singleSelectWithHints.metadata);
    expect(settings.scoring).toStrictEqual(singleSelectWithHints.state.settings.scoring);
  });

  test('Test invalid randomization', () => {
    const settings = parseSettings(numericWithHints.metadata);
    expect(settings.randomization).toBeUndefined();
  });

  test('Test invalid show answer', () => {
    const showAnswerSettings = parseShowAnswer(numericWithHints.metadata);
    expect(showAnswerSettings.on).toBeUndefined();
  });

  test('Test show answer settings missing', () => {
    const settings = parseShowAnswer(textInputWithHints.metadata);
    expect(settings.showAnswer).toBeUndefined();
  });

  test('Test empty metadata', () => {
    const scoreSettings = parseSettings({});
    expect(scoreSettings).toStrictEqual({});
  });

  test('Test null metadata', () => {
    const scoreSettings = parseSettings(null);
    expect(scoreSettings).toStrictEqual({});
  });
});
