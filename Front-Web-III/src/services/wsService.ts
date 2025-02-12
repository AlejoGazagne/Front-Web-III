import { ref } from 'vue';
import { Client as StompClient, type IMessage } from '@stomp/stompjs';

let stompClient: StompClient | null = null;
const isConnected = ref(false);

const subscriptions: Record<string, { callback: (message: any) => void; stompSubscription: any }> = {};

export const isConnectedRef = isConnected;

const activeSubscriptions = ref(0);

export const connect = (token: string) => {
  if (isConnected.value) return;
  console.log('Connecting to WebSocket...');

  stompClient = new StompClient({
    brokerURL: 'ws://localhost:8080/realtime-truck-load',
    connectHeaders: { Authorization: `Bearer ${token}` },

    onConnect: () => {
      isConnected.value = true;
      console.log('WebSocket connected');

      Object.keys(subscriptions).forEach(topic => {
        subscribe(topic, subscriptions[topic].callback);
      });
    },

    onStompError: (error) => {
      console.error('WebSocket connection error:', error);
      isConnected.value = false;
    },

    onWebSocketClose: () => {
      console.log('WebSocket closed');
      isConnected.value = false;
    },

    onWebSocketError: (error) => {
      console.error('WebSocket error:', error);
      isConnected.value = false;
    },
  });

  stompClient.activate();
};

export const subscribe = (topic: string, callback: (message: any) => void) => {
  if (!stompClient || !isConnected.value) {
    subscriptions[topic] = { callback, stompSubscription: null };
    return;
  }

  activeSubscriptions.value++;
  const stompSubscription = stompClient.subscribe(topic, (message: IMessage) => {
    const parsedMessage = JSON.parse(message.body);
    callback(parsedMessage);
  });

  subscriptions[topic] = { callback, stompSubscription };
};

export const unsubscribe = (topic: string) => {
  if (subscriptions[topic]) {
    subscriptions[topic].stompSubscription.unsubscribe();
    delete subscriptions[topic];
    activeSubscriptions.value--;
  }
};

export const disconnect = () => {
  if (stompClient && activeSubscriptions.value === 0) {
    stompClient.deactivate();
    stompClient = null;
  }
};