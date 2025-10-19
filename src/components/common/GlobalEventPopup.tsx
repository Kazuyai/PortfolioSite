import React from 'react';
import { useEvent } from '@/contexts/EventContext';

const GlobalEventPopup: React.FC = () => {
  const { activeEvent, eventContents } = useEvent();

  if (!activeEvent || !eventContents[activeEvent]) {
    return null;
  }

  // eventContentのJSX要素をクローンして、適切なクラス名を適用
  const content = eventContents[activeEvent];

  return React.cloneElement(content as React.ReactElement, {
    className: "eventContent"
  });
};

export default GlobalEventPopup;