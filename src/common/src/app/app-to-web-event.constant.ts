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
  Save = 'Save',
  Register = 'Register',
  Share = 'Share',
}

export interface InAppEventParams {
  [InAppEventType.ChangePushOn]: { isPushOn: boolean };
  [InAppEventType.Action]: { type: ActionType };
}
