
var rooms = {
    BlankRoom: {
        name: "blank",
        description: "its a blank room with nothing in it",
        choices

    }
}
var player = {
    whatRoom: "BlankRoom"
}

function drawRoom(){
    console.log(rooms[player.whatRoom]);
};

drawRoom();