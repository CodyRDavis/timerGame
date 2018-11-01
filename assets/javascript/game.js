//object holding all the rooms and their values
var rooms = {
    blankroom: {
        name: "blank",
        description: "its a blank room with nothing in it",
        image: "blank",
        requiredItem: "none",
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
        name: "Red Room",
        description: "its a red room...with lots of red things...tacky",
        image: "redroom.png",
        requiredItem: "none",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "The white looking room",
                key: "blankroom"
            },
            {
                name: 'The room with the blue wall',
                key: "blueroom"
            },
            {
                name: 'pick up the blue key on the floor.',
                key: 'getBlueKey'
            }
        ]
    },
    getBlueKey: {
        name: "Red Room",
        description: "you pick up the blueKey. it feels cool.",
        image: "redroom.png",
        requiredItem: "none",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "go back....",
                key: "redroom"
            }
        ]
    },
    blueroom: {
        name: "Blue Room",
        description: "its a realy really blue room with nothing in it",
        image: "blueroom.jpg",
        requiredItem: "bluekey",
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
    whatRoom: "blankroom",
    none: true,
    bluekey: false,
    "skullkey": false,
    "rustykey": false,
}

function playerUpdate() {

    var destination = this.id;
    requiredItems = rooms[destination].requiredItem;
    console.log("this room requires: " + requiredItems);
    console.log(player[requiredItems]);
    if (player[requiredItems]){
        console.log("destination: "+destination);
        player.whatRoom = destination;
        drawRoom();
        eventChecker();
    }
        
}

function drawRoom(){
    //variables for ease of reading
    var roomName = document.getElementById('roomName');
    var roomDescription = document.getElementById('roomDescription');
    var navigationOptions = document.getElementById('pathOptions');
    var roomImage = document.getElementById('roomImage');

    var currentRoom = rooms[player.whatRoom];

    //updating the text on gameboard
    roomName.textContent= currentRoom.name;
    roomDescription.textContent = currentRoom.description;
    roomImage.setAttribute('src', './assets/images/'+currentRoom.image);

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
   if (player.destination == getBlueKey){
       player.bluekey = true;
   }
}

drawRoom();