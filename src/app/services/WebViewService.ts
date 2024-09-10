import { RefObject } from 'react';
import WebView from 'react-native-webview';
import { Logger } from '@/utils/logger';
import { InAppEventName, InAppEventParams, InAppEventType } from '@blankclub/common/app/app-to-web-event.constant';

export const sendEventToWeb =
  (webViewRef: RefObject<WebView>) =>
  <E extends InAppEventType>(event: E, data: InAppEventParams[E]) => {
    if (event) {
      Logger.info(`Sending event to web: ${event}, ${JSON.stringify(data)}`);
      const script = getScript(event, data);
      webViewRef?.current?.injectJavaScript(script);
    }
  };

const getScript = <E extends InAppEventType>(event: InAppEventType, data: InAppEventParams[E]) =>
  `window.dispatchEvent(new CustomEvent("${InAppEventName}", ${JSON.stringify({
    detail: { type: event, message: data },
  })}));`;
