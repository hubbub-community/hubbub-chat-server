import sendToUser from '../lib/send-to-user';

/***
 * See information about the project and development team
 * @function
 * @name fallback
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const about = (n = null, socket: any, io: any) => {
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
`;
  sendToUser(message, socket, io, null);
};

export default about;
