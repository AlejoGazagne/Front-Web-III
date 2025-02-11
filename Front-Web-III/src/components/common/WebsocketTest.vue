<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="connect" :disabled="isConnected">Connect</v-btn>
          <v-btn @click="disconnect" :disabled="!isConnected">Disconnect</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>Messages</h2>
          <v-list>
            <v-list-item v-for="(msg, index) in messages" :key="index">
              <v-list-item-content>{{ msg }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Stomp from "stompjs";
  import {Client as StompClient} from '@stomp/stompjs'; 

  import SockJS from "sockjs-client";

  let stompClient = null;
  const messages = ref([]);
  const isConnected = ref(false);
  
  const token = localStorage.getItem("token");

  const connect = (token) => {
    const socket = new SockJS('http://localhost:8080/realtime-truck-load');

    stompClient = new StompClient({
      webSocketFactory: () => socket,  // Use webSocketFactory instead of brokerUrl
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: () => {
        console.log('Connected to STOMP');
        onConnected();  // Call the onConnected function
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        onError(frame);  // Call the onError function
      },
      debug: (str) => {
        console.log(new Date(), str);  // Log debug messages with timestamps
      }
    });

    

    stompClient.activate();  // Properly activate the STOMP client

    console.log("Connecting...");
  };
  
  function onConnected() {
    console.log("sexo2");
    console.log("Connected to WebSocket");

    isConnected.value = true;
    stompClient.subscribe("/topic/loadData", (message) => {
      const parsedMessage = JSON.parse(message.body);
      messages.value.push(parsedMessage.content);
    });
  }
  function onError(error) {
    console.log("sexo4");
    console.error("Error connecting to WebSocket:", error);
  }

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
        isConnected.value = false;
      });
    }
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  </style>