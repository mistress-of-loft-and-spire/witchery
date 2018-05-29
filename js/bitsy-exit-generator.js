
function checkExits(room, currPosition, prevPosition)
{
	
	var i = 0;
	
	for (i in roomLayout)
	{
		if (i != room)
		{
			
			var exitDirection = adjacent(currPosition, {x: roomLayout[i][0], y: roomLayout[i][1]});
			
			if(exitDirection)
			{
				connectExits(room, exitDirection, i)
				connectExits(i, reverse(exitDirection), room)
			}
			
		}
	}
	
	document.getElementById("datafield").value = rawData;
	
}


function connectExits(room, direction, targetRoom)
{
	console.log("room" + targetRoom + " is on the " + direction + " of room" + room);
	
	
	//var dataArray = rawData.split("\n\n");
	
	var roomRegex = new RegExp("ROOM (?:" + room + ")\\n((?:(?:\\w|,)+?\\n){16})(?:.|\\n)*?(?:PAL (.+))"); // todo: globalize this
	
	var i = 0; var j = 0; var k = 0;
	
	//for (i in dataArray)
	
	var roomData = roomRegex.exec(rawData);
	
	var roomDataArray = roomData[0].split(roomData[1]);
	
	var rawDataArray = rawData.split(roomData[0]);
	
	var i = 1;
	var exitList = "";
	
	for (i = 1; i <= 14; i++)
	{
		if     (direction == "right")  exitList += "EXT " + 15 + "," + i + " " + targetRoom + " " + 1 + "," + i + "\n";
		else if(direction == "left")   exitList += "EXT " + 0 + "," + i + " " + targetRoom + " " + 14 + "," + i + "\n";
		else if(direction == "bottom") exitList += "EXT " + i + "," + 15 + " " + targetRoom + " " + i + "," + 1 + "\n";
		else if(direction == "top")    exitList += "EXT " + i + "," + 0 + " " + targetRoom + " " + i + "," + 14 + "\n";
	}
	
	roomData = roomDataArray[0] + roomData[1] + exitList + roomDataArray[1];
	
	rawData = rawDataArray[0] + roomData + rawDataArray[1];

}

function disconnectExits(room, direction)
{
	
}


function adjacent(roomPosition, targetPosition)
{
	
	if (roomPosition.x + 1 == targetPosition.x && roomPosition.y == targetPosition.y)
	{
		return "right";
	}
	else if (roomPosition.x - 1 == targetPosition.x && roomPosition.y == targetPosition.y)
	{
		return "left";
	}
	else if (roomPosition.y + 1 == targetPosition.y && roomPosition.x == targetPosition.x)
	{
		return "bottom";
	}
	else if (roomPosition.y - 1 == targetPosition.y && roomPosition.x == targetPosition.x)
	{
		return "top";
	}
	
}

function reverse(direction)
{
	
	if (direction == "right") return "left";
	else if (direction == "left") return "right";
	else if (direction == "top") return "bottom";
	else if (direction == "bottom") return "top";
	
}