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
    },
    blankroom: {
        name: "blank",
        description: "its a blank room with nothing in it",
        image: "blank",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "Go through the blue door",
                key: "blueroom"
            },
            {
                name: 'Go through the red door',
                key: "redroom"
            }
        ]
    },
    redroom: {
        name: "prototype room 1",
        description: "its a red room",
        image: "redroom.png",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "The white looking room",
                key: "blankroom"
            },
            {
                name: 'The room with the blue wall',
                key: "blueroom"
            }
        ]
    },
    blueroom: {
        name: "Blue Room",
        description: "its a blank room with nothing in it",
        image: "blueroom.jpg",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "go back into the white room",
                key: "blankroom"
            },
            {
                name: 'go through the door into the red room',
                key: "redroom"
            }
        ]
    }
}
var player = {
    whatRoom: "blankroom"
}

function playerUpdate() {

    var destination = this.id;
    console.log("destination: "+destination);
    player.whatRoom = destination;
    drawRoom();
    eventChecker();
}

function drawRoom(){
    //variables for ease of reading
    var roomName = document.getElementById('roomName');
    var roomDescription = document.getElementById('roomDescription');
    var navigationOptions = document.getElementById('pathOptions');
    var htmlRoomImage = document.getElementById('roomImage');

    var currentRoom = rooms[player.whatRoom];

    //updating the text on gameboard
    roomName.textContent= currentRoom.name;
    roomDescription.textContent = currentRoom.description;
    var image = document.createElement("img");
    image.setAttribute('src', './assets/images/'+currentRoom.image);
    htmlRoomImage.innerHTML = "";
    htmlRoomImage.appendChild(image);

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

function eventChecker(){
    //check to see if we are in special rooms and do things not normal to the navigation
}
drawRoom();