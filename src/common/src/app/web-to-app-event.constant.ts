export interface WebViewEvent<I extends WebViewEventType> {
  type: I;
  message?: WebViewEventParams[I];
}

export enum WebViewEventType {
  OnLoad = 'OnLoad',
  ShowToast = 'ShowToast',
}

export interface WebViewEventParams {
  [WebViewEventType.OnLoad]: undefined;
  [WebViewEventType.ShowToast]: { text: string };
}
