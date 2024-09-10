export type EventListener<T> = (params: T) => void;

export class EventHandler<T> {
  private readonly listeners: EventListener<T>[];

  constructor() {
    this.listeners = [];
  }

  emit(params: T) {
    this.listeners.forEach(listener => listener(params));
  }

  addEventListener(listener: EventListener<T>) {
    this.listeners.push(listener);
    return () => {
      this.removeEventListener(listener);
    };
  }

  private removeEventListener(listener: EventListener<T>) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
}
