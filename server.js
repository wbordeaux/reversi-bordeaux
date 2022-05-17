/*********************************/
/* Set up the static file server */
let static = require('node-static');

/*Set up the http server library*/
let http = require('http');

/* Assume that we are running on Heroku */
let port = process.env.PORT;
let directory = __dirname + '/public';

/* If we aren't on Heroku, then we need to adjust our port and directory */
if ((typeof port == 'undefined') || (port === null)){
    port = 8080;
    directory = './pubic';
}

/* Set up our static file web server to deliver files from the filesystem */
let file = new static.Server(directory);

let app = http.createServer(
    function(request,response){
        request.addListener('end',
            function(){
                file.serve(request,response);
            }
        ).resume();
    }
).listen(port);

console.log('The server is running');


/*********************************/
/* Set up the static file server */

const { Server } = require("socket.io");
const io = new Server(app);

io.on('connection', (socket) => {

    /* Output a log message on the server and send it to the clients */
    function serverLog(...messages){
        io.emit('log',['**** Message from the server:\n']);
        messages.forEach((item) => {
            io.emit('log',['****\t'+item]);
            console.log(item);
        })
    }

    serverLog('a page connected to the server: '+socket.id);
    
    socket.on('disconnect', () => {
        serverLog('a page disconnected from the server: '+socket.id);
    });


    /* join_room command handler */
    /* expected payload:
        {
            'room': to be joined,
            'username': the name of the user joining the room
        }
    */
    /* join_room_response:
    {
        'result': 'success',
        'room': room that was joined,
        'username': the user that joined the room,
        'count': the number of users in the chat room
    }
or
    {
        'result': 'fail',
        'message': the reason for failure
    }
*/


    socket.on('join_room', () => {
        serverLog('Server received a command','\'join_room\'',JSON.stringify(payload));
    });
});












