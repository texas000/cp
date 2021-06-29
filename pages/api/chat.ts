import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as ServerIO } from 'socket.io';

type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO;
        };
    };
};

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === 'POST') {
        // get message
        const message = req.body;

        // dispatch to channel "message"
        res?.socket?.server?.io?.emit('message', message);

        // return message
        res.status(201).json(message);
    }
};
