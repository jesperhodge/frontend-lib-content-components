import ReactStateSettingsParser from '../../data/ReactStateSettingsParser';
import ReactStateOLXParser from '../../data/ReactStateOLXParser';

// eslint-disable-next-line import/prefer-default-export
export const parseState = (problem, isAdvanced, ref) => () => {
  const reactSettingsParser = new ReactStateSettingsParser(problem);
  const reactOLXParser = new ReactStateOLXParser({ problem });
  const rawOLX = ref?.current?.state.doc.toString();

  return {
    settings: reactSettingsParser.getSettings(),
    olx: isAdvanced ? rawOLX : reactOLXParser.buildOLX(),
  };
};
