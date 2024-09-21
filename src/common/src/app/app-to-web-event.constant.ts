export const InAppEventName = 'BlankclubInAppEvent';

export interface InAppEvent<I extends InAppEventType> extends Event {
  type: I;
  message: InAppEventParams[I];
}

export enum InAppEventType {
  ChangePushOn = 'ChangePushOn',
  Action = 'Action',
}

export enum ActionType {
  Share = 'Share',
}

export interface InAppEventParams {
  [InAppEventType.ChangePushOn]: { isPushOn: boolean };
  [InAppEventType.Action]: { type: ActionType };
}

export const getWindowDispatchScript = <E extends InAppEventType>(event: InAppEventType, data: InAppEventParams[E]) =>
  `window.dispatchEvent(new CustomEvent("${InAppEventName}", ${JSON.stringify({
    detail: { type: event, message: data },
  })}));`;