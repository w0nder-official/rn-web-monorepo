import { WebViewEvent, WebViewEventParams, WebViewEventType } from '@blankclub/common/src/app/web-to-app-event.constant';


export class AppBridge {
  static sendToApp(type: WebViewEventType, message?: WebViewEventParams[typeof type]) {
    if (typeof window !== 'undefined') {
      window.ReactNativeWebView?.postMessage?.(JSON.stringify({ type, message } as WebViewEvent<WebViewEventType>));
    }
  }
  static onLoad() {
    this.sendToApp(WebViewEventType.OnLoad);
  }

  static showToast(text: string) {
    this.sendToApp(WebViewEventType.ShowToast, { text });
  }
}
