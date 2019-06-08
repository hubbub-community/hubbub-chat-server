import { Server, Socket } from 'socket.io'

import sendToUser from '../lib/send-to-user'

/**
 * See information about the project and development team
 * @param arg Unused parameter
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */

const about = (arg: null = null, socket: Socket, io: Server): void => {
  const message = `
==================================
_        _    _         _    
| |_ _  _| |__| |__ _  _| |__ 
| ' \\ || | '_ \\ '_ \\ || | '_ \\
|_||_\\_,_|_.__/_.__/\\_,_|_.__/
                              
==================================

The Hubbub team is proud to launch
the Hubbub platform, including the
Hubbub Community Client and Hubbub
Chat. We are:

Joseph Wolfe, Alex White, and 
Spencer Hirata

|￣￣￣￣￣￣|  
|     Eat    |
|    Sleep   |
|    Code    |
|   Hubbub   | 
|＿＿＿＿＿＿|
(\\__/) || 
(•ㅅ•) || 
/     づ

===================================
`
  sendToUser(message, socket, io, null)
}

export default about
