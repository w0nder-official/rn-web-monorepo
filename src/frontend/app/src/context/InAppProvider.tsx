import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  ActionType,
  InAppEvent,
  InAppEventName,
  InAppEventParams,
  InAppEventType,
} from '@blankclub/common/src/app/app-to-web-event.constant';
import { UsedOutsideProviderError } from '@blankclub/frontend-app/utils/exceptions';
import { EventHandler, EventListener as EventHandlerListener } from 'utils/EventHandler';
import { AppBridge } from '@blankclub/frontend-app/utils/AppBridge';

interface InAppState {
  isPushOn: boolean;
  addActionEventListener: (listener: EventHandlerListener<{ type: ActionType }>) => () => void;
}

const defaultState: InAppState = {
  isPushOn: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addActionEventListener: (listener: EventHandlerListener<{ type: ActionType }>) => () => {},
};

const InAppContext = createContext<InAppState>(defaultState);

export const InAppProvider = ({ children }: { children: ReactNode }) => {
  const [isPushOn, setIsPushOn] = useState(defaultState.isPushOn);
  const [actionListeners] = useState(new EventHandler<{ type: ActionType }>());

  const handleInAppEvent = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (event: any) => {
      const payload = event.detail as InAppEvent<InAppEventType>;

      switch (payload.type) {
        case InAppEventType.ChangePushOn: {
          const message = payload.message as InAppEventParams[typeof payload.type];
          setIsPushOn(message.isPushOn);
          alert(`Push notification is ${message.isPushOn ? 'on' : 'off'}`);
          break;
        }
        case InAppEventType.Action: {
          const message = payload.message as InAppEventParams[typeof payload.type];
          actionListeners.emit({ type: message.type });
          break;
        }
        default: {
          // Nothing
        }
      }
    },
    [actionListeners],
  );

  useEffect(() => {
    window.addEventListener(InAppEventName, handleInAppEvent as unknown as EventListener);
    return () => {
      window.removeEventListener(InAppEventName, handleInAppEvent as unknown as EventListener);
    };
  }, [handleInAppEvent]);

  useEffect(() => {
    AppBridge.onLoad();
  }, []);

  const value = useMemo(
    () => ({
      isPushOn,
      addActionEventListener: (listener: EventHandlerListener<{ type: ActionType }>) =>
        actionListeners.addEventListener(listener),
    }),
    [actionListeners, isPushOn],
  );

  return <InAppContext.Provider value={value}>{children}</InAppContext.Provider>;
};

export const useInAppState = () => {
  const context = useContext(InAppContext);

  if (!context) {
    throw new UsedOutsideProviderError('useInAppState was used outside of its Provider');
  }

  return useMemo(() => context, [context]);
};
