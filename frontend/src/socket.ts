import { io, Socket } from 'socket.io-client';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const socket: Socket = io(BACKEND, { transports: ['websocket'] });
