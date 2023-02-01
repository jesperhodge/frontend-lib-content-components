import React from 'react';
import { Collapsible, Icon, Card } from '@edx/paragon';
import { KeyboardArrowUp, KeyboardArrowDown } from '@edx/paragon/icons';
import {
  arrayOf, shape, string, node,
} from 'prop-types';
import { showFullCard } from './hooks';
import CardSection from './CardSection';

export const SettingsOption = ({
  title, className, extraSections, children, summary, ...passThroughProps
}) => {
  const { isCardCollapsibleOpen, toggleCardCollapse } = showFullCard();

  return (
    <Card className={`${className} settingsOption border border-light-700 shadow-none`}>
      <Card.Section className="settingsCardTitleSection" key={`settingsOption-${title}-header`}>
        <Collapsible.Advanced
          open={isCardCollapsibleOpen}
          onToggle={toggleCardCollapse}
        >
          <Collapsible.Trigger className="collapsible-trigger d-flex">
            <span className="flex-grow-1 text-primary-500 x-small">{title}</span>
            <Collapsible.Visible whenClosed>
              <Icon src={KeyboardArrowDown} />
            </Collapsible.Visible>
            <Collapsible.Visible whenOpen>
              <Icon src={KeyboardArrowUp} />
            </Collapsible.Visible>
          </Collapsible.Trigger>
        </Collapsible.Advanced>
      </Card.Section>
      <CardSection {...passThroughProps} isCardCollapsibleOpen={isCardCollapsibleOpen} summary={summary} key={`settingsOption-${title}-children`}>
        {children}
      </CardSection>
      {extraSections.map((section, index) => (
        <>
          {isCardCollapsibleOpen && <hr />}
          {/* eslint-disable-next-line react/no-array-index-key */}
          <CardSection {...passThroughProps} isCardCollapsibleOpen={isCardCollapsibleOpen} key={`settingsOption-${title}-${index}`}>
            {section.children}
          </CardSection>
        </>
      ))}
    </Card>
  );
};
SettingsOption.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  className: string,
  summary: string.isRequired,
  extraSections: arrayOf(shape({
    children: node,
  })),
};
SettingsOption.defaultProps = {
  className: '',
  extraSections: [],
};

export default SettingsOption;
