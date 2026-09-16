import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
    reconnectionDelayMax: 10000,
    autoConnect: false
});