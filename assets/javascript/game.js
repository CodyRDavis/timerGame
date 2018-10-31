//object holding all the rooms and their values
var rooms = {
    BlankRoom: {
        name: "blank",
        description: "its a blank room with nothing in it",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "Blank Room",
                key: "BlankRoom"
            },
            {
                name: 'Blank Hallway',
                key: "BlankRoom"
            }
        ]
    }
}
var player = {
    whatRoom: "BlankRoom"
}

function playerUpdate() {
    var destination = this.id;

    console.log("destination: "+destination);
    //player.whatRoom = destination;
    //drawRoom();
}

function drawRoom(){
    //variables for ease of reading
    var roomName = document.getElementById('roomName');
    var roomDescription = document.getElementById('roomDescription');
    var navigationOptions = document.getElementById('pathOptions');

    var currentRoom = rooms[player.whatRoom];

    //updating the text on gameboard
    roomName.textContent= currentRoom.name;
    roomDescription = currentRoom.description;

    var list = document.createElement("ul");
    for (var option in currentRoom.choices) {
        var availableOption = document.createElement("li")
        availableOption.textContent = currentRoom.choices[option].name;
        availableOption.id = currentRoom.choices[option].key;
        //adding in click listener and adding it to the option. the key is the name of the room that can be found in Rooms Object.
        availableOption.addEventListener("click", playerUpdate);

        list.appendChild(availableOption);
    }
    navigationOptions.innerHTML = "";//clears out anything there
    navigationOptions.append(list);
};

drawRoom();