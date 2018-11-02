//object holding all the rooms and their values
var rooms = {
    bedroom: {
        name: "Bedroom",
        description: "It's an old musty bedroom. it looks like the bed has some stains on it...is that blood?",
        image: "bedroom.jpg", //TODO
        requiredItem: "none",
        //choices defines which rooms player can access from this room
        choices: [
            {
                name: "Open the door to the hallway", key: "hallwayBedroom"
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
        image: "bathroom.jpg",//TODO
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
        image: "underbed.jpg", //TODO
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
        image: "../images/bedroom.jpg", //TODO
        requiredItem: "none",
        choices: [
            {
                name: "go back",key: "bedroom"
            }
        ]//end of choices
    },//end of room
    noteOnBed: {
        name: "Note",
        description: "This Note is hand written. It says I need to get out of the house by midnight. What could this be about...",
        image: "note.png", //TODO
        requiredItem: "none",
        choices: [
            {
                name: "go back",key: "onBed"
            }
        ]//end of choices
    },
    hallwayBedroom: {
        name: "Hallway just outside the bedroom",
        description: "The light in the hallway is out, it's hard to see. I hope nothing is out here.",
        image: "hallway.jpg", //TODO
        requiredItem: "bedroomKey",
        choices: [
            {
                name: "Open the door to the bedroom",key: "bedroom"
            }
        ]//end of choices
    }
}//end of all the rooms

var player = {
    whatRoom: "bedroom",
    //flags for special events
    awake: false,
    note: false,

    //items to open and get further in the game and 
    none: true,
    bedroomKey: false,

}

var roomName = document.getElementById('roomName');
var roomDescription = document.getElementById('roomDescription');
var navigationOptions = document.getElementById('pathOptions');
var roomImage = document.getElementById('roomImage');

function playerUpdate() {

    var destination = this.id;
    requiredItems = rooms[destination].requiredItem;
    if (player[requiredItems]){
        console.log("destination: "+destination);
        player.whatRoom = destination;
        drawRoom();
        eventChecker();
    } else {
        roomDescription.textContent = "Hm.... I don't seem able to get into this room. Maybe if I had a key.";   
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
    if(currentLocation == "onBed" && !player.note){//checking to see if player has the note from the bed yet
        drawSpecialEvent("Take the note off the bed.", "noteOnBed");
        player.note = true;
    }
    if(currentLocation == "bedroom" && !player.awake){
        roomDescription.textContent = "Hm...ugh... my head is killing me. Where am I? This bedroom doesnt look familiar to me...";
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

function gameover() {

    var availableOption = document.createElement("li")
    availableOption.textContent = "Rewind the clock?";
    availableOption.addEventListener("click", startGame);

    navigationOptions.innerHTML = "";
    navigationOptions.append(availableOption);
    roomDescription.textContent = "The Bell strikes midnight and the house shakes and finally collapses and crushes you inside.";
    roomImage.setAttribute('src', './assets/images/gameover.jpg');

    //reinitilizing the player values back to default for possible restart
    player.whatRoom = "bedroom";
    player.awake = false;
    player.note = false;
    player.none = true;
    player.bedroomKey = false;
}

function startGame() {
    drawRoom();
    eventChecker();
    setTimeout(gameover, 50 * 1000);
}

startGame();