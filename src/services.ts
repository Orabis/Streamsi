import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
    reconnectionDelayMax: 10000,
    autoConnect: false
});

export function login(password: string) {
    socket.auth = { token: password };
    socket.connect()
}