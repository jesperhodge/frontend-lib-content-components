import { useState } from 'react';

/* eslint-disable import/prefer-default-export */
export const useCollapsible = () => {
  const [isCardCollapsibleOpen, setIsCardCollapsibleOpen] = useState(false);
  return {
    isCardCollapsibleOpen,
    toggleCardCollapse: () => setIsCardCollapsibleOpen(!isCardCollapsibleOpen),
  };
};
