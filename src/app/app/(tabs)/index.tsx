import { StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { sendEventToWeb } from '@/services/WebViewService';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InAppEventType } from '@blankclub/common/app/app-to-web-event.constant';
import { WebViewEvent, WebViewEventParams, WebViewEventType } from '@blankclub/common/app/web-to-app-event.constant';
import { Logger } from '@/utils/logger';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const sendEvent = sendEventToWeb(webViewRef);
      sendEvent(InAppEventType.ChangePushOn, { isPushOn: true });
    }
  }, [isLoaded]);

  const handleOnMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      if (!event.nativeEvent) {
        return;
      }

      const { type, message } = JSON.parse(event.nativeEvent.data) as WebViewEvent<WebViewEventType>;
      try {
        switch (type) {
          case WebViewEventType.OnLoad: {
            const payload = message as WebViewEventParams[typeof type];
            setIsLoaded(true);
            break;
          }

          case WebViewEventType.ShowToast: {
            const payload = message as WebViewEventParams[typeof type];
            console.log(payload?.text);
            break;
          }

          default: {
            Logger.info('Not support GlobalWebviewEventType', type);
            break;
          }
        }
      } catch (e) {
        Logger.error(e);
      }
    },
    [],
  );

  return (
    <WebView ref={webViewRef} source={{ uri: 'https://mean-taxes-decide.loca.lt/' }} style={{ flex: 1 }} onMessage={handleOnMessage}/>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
