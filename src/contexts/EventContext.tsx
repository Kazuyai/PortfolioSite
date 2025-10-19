import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface EventContextType {
  activeEvent: string | null;
  setActiveEvent: (eventId: string | null) => void;
  eventContents: { [key: string]: JSX.Element };
  registerEventContent: (eventId: string, content: JSX.Element) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
  activeEvent: string | null;
  setActiveEvent: (eventId: string | null) => void;
}

export const EventProvider: React.FC<EventProviderProps> = ({
  children,
  activeEvent,
  setActiveEvent
}) => {
  const [eventContents, setEventContents] = useState<{ [key: string]: JSX.Element }>({});

  const registerEventContent = useCallback((eventId: string, content: JSX.Element) => {
    setEventContents(prev => {
      // 既に同じイベントが登録されている場合は更新しない
      if (prev[eventId]) {
        return prev;
      }
      return {
        ...prev,
        [eventId]: content
      };
    });
  }, []);

  return (
    <EventContext.Provider value={{
      activeEvent,
      setActiveEvent,
      eventContents,
      registerEventContent
    }}>
      {children}
    </EventContext.Provider>
  );
};