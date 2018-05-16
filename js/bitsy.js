


function load()
{
	if(defaultData) {
		document.getElementById("datafield").value = defaultData;
		defaultData = null;
	}
	
	var i = 0;
	
	for(i in gameRooms)
	{
		var canvasRemove = document.getElementById("canvas-" + i);
		canvasRemove.parentElement.remove();
	}
	
	gameTitle = null;
	
	gameRooms = {};
	gameTiles = {};
	gameSprites = {};
	gamePalettes = { default : [[0,82,204],[128,159,255],[255,255,255]] };
	
	parse();
	
	var i = 0;
	
	for(i in gameRooms)
	{
		addCanvas(i);
	}
	
}

function addCanvas(id)
{
	
	// add room canvas container to html with appropriate properties
	var canvasContainer = document.createElement("div");
    canvasContainer.setAttribute("class", "mapTile inList");
    canvasContainer.innerHTML = "<canvas id='canvas-" + id + "' title='room " + id + "' onmousedown='startDrag(event);'></canvas>";
	
	// check if imported layout data is available for this room
	if (roomLayout && id in roomLayout)
	{
		canvasContainer.style.left = roomLayout[id][0] * 131 + "px";
		canvasContainer.style.top = roomLayout[id][1] * 131 + "px";
		
		console.log(roomLayout);
	}
	
	document.getElementById("roomfield").appendChild(canvasContainer);
	
	var canvas = document.getElementById("canvas-" + id);
	canvas.width = 128;
	canvas.height = 128;
	var ctx = canvas.getContext("2d");
	
	
	setColor(gameRooms[id][1], 0, ctx);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var i = 0; var j = 0;
	
	for(i in gameRooms[id][0])
	{
		for (j in gameRooms[id][0][i])
		{
			if (gameRooms[id][0][i][j] != "0")
			{
				draw("tile", gameRooms[id][0][i][j], j, i, gameRooms[id][1], ctx);
			}
		}
	}
	
	for(i in gameSprites)
	{
		if (gameSprites[i][1] == id)
		{
			draw("sprite", i, gameSprites[i][2][0], gameSprites[i][2][1], gameRooms[id][1], ctx);
		}
	}
	
}

function metadata()
{
	
	if(!roomLayout[0]) return
	
	var tempData = rawData.split("! ROOM_FORMAT 1");
	
	rawData = tempData[0] + "! ROOM_FORMAT 1" + "\n" + "! WITCHERY_METADATA";
	
	var i = 0;
	
	for (i in roomLayout)
	{
		rawData += "[" + roomLayout[i] + ","  + roomLayout[i][0] + ","  + roomLayout[i][1] + "]";
	}
	
	rawData += " " + (version * 10) + tempData[1];
	
	document.getElementById("datafield").value = rawData;
	
}

	
// IMPORT RAW GAME DATA
// uses regular expressions (regex) to parse raw bitsy game data to usable object arrays
function parse()
{	
	
	if(gameTitle)
	{
		//TODO: check if already loaded and ask before overwriting?
		//break
	}
	
	rawData = document.getElementById("datafield").value;
	
	// get BITSY VERSION and ROOM_FORMAT flags with regex
	gameBitsyVersion = /# BITSY VERSION (.*)/.exec(rawData)[1];
	gameRoomFormat = /! ROOM_FORMAT (.*)/.exec(rawData)[1];
	
	// if present, get WITCHERY METADATA
	var metadataOutput = /! WITCHERY_METADATA\[(.*)\] (.*)/.exec(rawData);
	
	if(metadataOutput)
	{
		var arrayLayout = metadataOutput[1].split("][");
		
		var i = 0;
		for (i in arrayLayout)
		{
			arrayLayout[i] = arrayLayout[i].split(",");
			
			roomLayout[arrayLayout[i][0]] = [arrayLayout[i][1],arrayLayout[i][2]];
		}
		
		gameWitcheryVersion = metadataOutput[2];
	}
	
	var dataArray = rawData.split('\n\n');
	
	
	// get GAME TITLE
	gameTitle = dataArray[0];
	document.getElementById("title").innerHTML = gameTitle;
	
	
	var paletteRegex = /PAL (.+)\n(?:.|\n)*?(?:(.+),(.+),(.+)\n(.+),(.+),(.+)\n(.+),(.+),(.+))/;
	var roomRegex = /ROOM (.+)\n((?:(?:\w|,)+?\n){16})(?:.|\n)*?(?:PAL (.+))/;
	var tileRegex = /TIL (.+)\n((?:\d{8}(?:|\n)){8})/;
	var spriteRegex = /SPR (.+)\n((?:\d{8}(?:|\n)){8})(?:.|\n)+?POS (.+) (.+),(.+)/;
	
	var i = 0; var j = 0; var k = 0;
	
	for (i in dataArray)
	{
		if(tileRegex.exec(dataArray[i])) //get TILES via regex
		{
			
			var output = tileRegex.exec(dataArray[i])
			
			var arrayRows = output[2].split("\n");
			var tileArray = [];
			
			for (j in arrayRows)
			{
				tileArray[j] = [];
				
				for (k = 0; k < arrayRows[j].length; k++)
				{
					tileArray[j][k] = arrayRows[j].charAt(k);
				}
			}
			
			gameTiles[output[1]] = tileArray;
			//{ id : [[0,0,0,1,0,1,1,0], [], [], ... ]] }
			
		}
		else if(roomRegex.exec(dataArray[i])) //get ROOMS via regex
		{
			
			var output = roomRegex.exec(dataArray[i]);
			
			var arrayRows = output[2].split("\n");
			var roomArray = [];
			
			for (j in arrayRows)
			{
				roomArray[j] = arrayRows[j].split(",");
			}
			
			var paletteOutput = output[3];
			if (!paletteOutput) paletteOutput = 0;
			
			gameRooms[output[1]] = [roomArray, paletteOutput];
			//{ id : [[ [0,0,a,a,a...], [], [], ... ], [palette id]] }
			
		}
		else if(paletteRegex.exec(dataArray[i])) //get PALETTES via regex
		{
			
			var output = paletteRegex.exec(dataArray[i]);
			
			gamePalettes[output[1]] = [[output[2],output[3],output[4]],[output[5],output[6],output[7]],[output[8],output[9],output[10]]];
			//{ id : [[r,g,b], [r,g,b], [r,g,b]] }
			
		}
		else if(spriteRegex.exec(dataArray[i])) //get SPRITES via regex
		{
			
			var output = spriteRegex.exec(dataArray[i]);
			
			var arrayRows = output[2].split("\n");
			var spriteArray = [];
			
			for (j in arrayRows)
			{
				spriteArray[j] = [];
				
				for (k = 0; k < arrayRows[j].length; k++)
				{
					spriteArray[j][k] = arrayRows[j].charAt(k);
				}
			}
			
			gameSprites[output[1]] = [spriteArray, output[3], [output[4], output[5]]];
			//{ id : [[[0,0,0,1,0,1,1,0], [], [], ... ], map id, [x, y]] }
			
		}
		
	}
	
}

// DRAWING FUNCTIONS

var scale = 1;

function draw(type, id, x, y, palette, context)
{
	
	if(type != "sprite" && type != "tile") return;
	
	x = x * 8 * scale;
	y = y * 8 * scale;
	
	if(type == "tile")
	{
		var drawData = gameTiles[id]
		setColor(palette, 1, context);
	}
	else
	{
		var drawData = gameSprites[id][0]
		setColor(palette, 2, context);
	}
	
	var i = 0; var j = 0;
	
	for(i in drawData)
	{
		for (j in drawData[i])
		{
			if (drawData[i][j] == "1")
			{
				context.fillRect(x + (j * scale), y + (i * scale), scale, scale);
			}
		}
	}
	
}

function setColor(paletteName, colorNumber, context)
{
	context.fillStyle = "rgb(" + gamePalettes[paletteName][colorNumber][0] + "," + gamePalettes[paletteName][colorNumber][1] + "," + gamePalettes[paletteName][colorNumber][2] + ")";
}

