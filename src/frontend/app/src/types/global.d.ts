/// <reference types="@emotion/react/types/css-prop" />
export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactNativeWebView: any;
  }
}
