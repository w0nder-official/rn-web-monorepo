import { RefObject } from 'react';
import WebView from 'react-native-webview';
import { Logger } from '@/utils/logger';
import {
  getWindowDispatchScript,
  InAppEventName,
  InAppEventParams,
  InAppEventType
} from '@blankclub/common/app/app-to-web-event.constant';


export const sendEventToWeb =
  (webViewRef: RefObject<WebView>) =>
  <E extends InAppEventType>(event: E, data: InAppEventParams[E]) => {
    if (!webViewRef.current) {
      Logger.error('webViewRef is not defined');
      return;
    }

    if (event) {
      Logger.info(`Sending event to web: ${event}, ${JSON.stringify(data)}`);
      const script = getWindowDispatchScript(event, data);
      webViewRef.current?.injectJavaScript(script);
    }
  };
