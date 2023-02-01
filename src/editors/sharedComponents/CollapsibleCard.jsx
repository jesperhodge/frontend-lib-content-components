import React from 'react';
import { Collapsible, Icon, Card } from '@edx/paragon';
import { KeyboardArrowUp, KeyboardArrowDown } from '@edx/paragon/icons';
import {
  arrayOf, shape, string, node, bool,
} from 'prop-types';
import { showFullCard } from '../containers/ProblemEditor/components/EditProblemView/SettingsWidget/hooks';

const CardSection = ({
  children, none, isCardCollapsibleOpen, summary,
}) => {
  const show = isCardCollapsibleOpen || summary;
  if (!show) { return null; }

  return (
    <Card.Section className="px-4 pb-4 pt-3">
      <Collapsible.Advanced
        open={!isCardCollapsibleOpen}
      >
        <Collapsible.Body className="collapsible-body">
          <span className={`small ${none ? 'text-gray-500' : 'text-primary-500'}`}>{summary}</span>
        </Collapsible.Body>
      </Collapsible.Advanced>
      <Collapsible.Advanced
        open={isCardCollapsibleOpen}
      >
        <Collapsible.Body className="collapsible-body">
          {children}
        </Collapsible.Body>
      </Collapsible.Advanced>
    </Card.Section>
  );
};
CardSection.propTypes = {
  none: bool,
  children: node.isRequired,
  summary: string,
  isCardCollapsibleOpen: bool.isRequired,
};
CardSection.defaultProps = {
  none: false,
  summary: null,
};

export const CollapsibleCard = ({
  title, className, extraSections, children, summary, ...passThroughProps
}) => {
  const { isCardCollapsibleOpen, toggleCardCollapse } = showFullCard();

  return (
    <Card className={`${className} CollapsibleCard border border-light-700 shadow-none`}>
      <Card.Section className="settingsCardTitleSection">
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
          <CardSection {...passThroughProps} isCardCollapsibleOpen={isCardCollapsibleOpen} key={`CollapsibleCard-${title}-${index}`}>
            {section.children}
          </CardSection>
        </>
      ))}
    </Card>
  );
};
CollapsibleCard.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  className: string,
  summary: string.isRequired,
  extraSections: arrayOf(shape({
    children: node,
  })),
};
CollapsibleCard.defaultProps = {
  className: '',
  extraSections: [],
};

export default CollapsibleCard;
