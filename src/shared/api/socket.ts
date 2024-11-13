// services/socket.ts
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  public connect(userId: string) {
    if (!this.socket) {
      this.socket = io("https://r6nt2plp-4500.asse.devtunnels.ms", {
        // Замените на ваш URL сервера
        query: {
          userId,
        },
      });

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      this.socket.on("error", (error: any) => {
        console.error("WebSocket Error:", error);
      });
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  // Добавьте методы для отправки и прослушивания событий по мере необходимости
}

const socketService = new SocketService();
export default socketService;
