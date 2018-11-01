//object holding all the rooms and their values
var rooms = {
    bedroom: {
        name: "Bedroom",
        description: "It's an old musty bedroom. it looks like the bed has some stains on it...is that blood?",
        image: "blank", //TODO
        requiredItem: "none",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "Open the door to the hallway", key: "hallway-bedroom"
            },
            {
                name: "Open the door to the bathroom", key: "bathroom"
            },
            {
                name:"Look at the the bed.", key: "onBed"
            },
            {
                name: "check under the bed", key: "underbed"
            }
        ]
    },
    bathroom: {
        name: "Bathroom - connected to the bedroom",
        description: "It kinda smells in here- I don't think this has been cleaned in a long time.",
        image: "blank",//TODO
        requiredItem: "none",
        choices: [
            {
                name: "Go back to the bedroom",
                key: "bedroom"
            }
        ]
    },
    underbed :
    {
        name: "looking under the Bed",
        description: "It's so dusty under here, I'll be sneezing for hours...",
        image: "blank", //TODO
        requiredItem: "none",
        choices: [
            {
                name: "Get out from under the bed.",
                key: "bedroom"
            }
        ]
    },
    onBed: {
        name: "Looking at the bed",
        description: "This bed has a big stain on it... gross",
        image: "NONE", //TODO
        requiredItem: "none",
        choices: [
            {
                name: "go back",
                key: "bedroom"
            }
        ]//end of choices
    }//end of room

}//end of all the rooms

var player = {
    whatRoom: "bedroom",
    //flags for special events
    awake: false,
    note: false,

    //items to open and get further in the game and 
    none: true,
    bluekey: false,
    "skullkey": false,
    "rustykey": false,
}

var roomName = document.getElementById('roomName');
var roomDescription = document.getElementById('roomDescription');
var navigationOptions = document.getElementById('pathOptions');
var roomImage = document.getElementById('roomImage');

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
    } else {
        roomDescription.textContent = "Hm.... I don't seem able to get into this room. Maybe if I had a "+requiredItems+".";   
    }
    console.log (player);
        
}

function drawRoom(){
    //variables for ease of reading
    // var roomName = document.getElementById('roomName');
    // var roomDescription = document.getElementById('roomDescription');
    // var navigationOptions = document.getElementById('pathOptions');
    // var roomImage = document.getElementById('roomImage');

    var currentRoom = rooms[player.whatRoom];

    //updating the text on gameboard
    roomName.textContent= currentRoom.name;
    roomDescription.textContent = currentRoom.description;
    roomImage.setAttribute('src', './assets/images/'+currentRoom.image);

    var list = document.createElement("ul")
    list.id = "nav";
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
    var currentLocation = player.whatRoom;
    if(currentLocation == "onBed" &&!player.note){//checking to see if player has the note from the bed yet
        drawSpecialEvent("Take the note off the bed.", "noteOnBed");
    }
}

function drawSpecialEvent(text, id) {
    var availableOption = document.createElement("li")
    availableOption.textContent = text;
    availableOption.id = id;
    //adding in click listener and adding it to the option. the key is the name of the room that can be found in Rooms Object.
    availableOption.addEventListener("click", playerUpdate);
    document.getElementById('nav').appendChild(availableOption);
}
drawRoom();