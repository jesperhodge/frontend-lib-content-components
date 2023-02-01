import React from 'react';
import { Collapsible, Icon, Card } from '@edx/paragon';
import { KeyboardArrowUp, KeyboardArrowDown } from '@edx/paragon/icons';
import {
  arrayOf, string, node,
} from 'prop-types';
import CardSection from './CardSection';
import { useCollapsible } from './hooks';

/** CollapsibleCard
 *
 * You can pass an array of sections to this component and they will each be rendered in their own CardSection.
 */
export const CollapsibleCard = ({
  title, className, children, summary, sections, ...passThroughProps
}) => {
  const { isCardCollapsibleOpen, toggleCardCollapse } = useCollapsible();
  const content = children ? [children, ...sections] : sections;

  const header = (
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
  );

  return (
    <Card className={`${className} CollapsibleCard border border-light-700 shadow-none`}>
      {header}
      {content.map((section, index) => (
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
  children: node,
  sections: arrayOf(node),
  className: string,
  summary: string.isRequired,
};
CollapsibleCard.defaultProps = {
  className: '',
  children: null,
  sections: [],
};

export default CollapsibleCard;
