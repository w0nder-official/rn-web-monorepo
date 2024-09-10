import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { sendEventToWeb } from '@/services/SendEventToWebService';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InAppEventType } from '@blankclub/common/app/app-to-web-event.constant';
import { WebViewEvent, WebViewEventParams, WebViewEventType } from '@blankclub/common/app/web-to-app-event.constant';
import { Logger } from '@/utils/logger';
import { Alert } from 'react-native';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const sendEvent = sendEventToWeb(webViewRef);
      sendEvent(InAppEventType.ChangePushOn, { isPushOn: true });
    }
  }, [isLoaded]);

  const handleOnMessage = useCallback(async (event: WebViewMessageEvent) => {
    if (!event.nativeEvent) {
      return;
    }

    const { type, message } = JSON.parse(event.nativeEvent.data) as WebViewEvent<WebViewEventType>;
    try {
      switch (type) {
        case WebViewEventType.OnLoad: {
          setIsLoaded(true);
          break;
        }

        case WebViewEventType.ShowToast: {
          Alert.alert('Alert', message?.text ?? '');
          break;
        }

        default: {
          Logger.info('Not support WebviewEventType', type);
          break;
        }
      }
    } catch (e) {
      Logger.error(e);
    }
  }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://tunnel-app.blankclub.work/' }}
      style={{ flex: 1 }}
      onMessage={handleOnMessage}
    />
  );
}
