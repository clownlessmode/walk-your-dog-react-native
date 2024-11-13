import useUserStore from '@entity/users/user.store';
import socketService from '@shared/api/socket';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useUserStore((state) => state.user);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user?.id) {
      socketService.connect(user?.id);
      setSocket(socketService.getSocket());

      return () => {
        socketService.disconnect();
      };
    }
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
