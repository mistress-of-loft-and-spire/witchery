
var version = "0.5 BETA";


function start()
{
	load();
	
	//document.getElementById("title").innerHTML = getTitle(document.getElementById("datafield").value);
}

function addCanvas(id)
{
	
	var canvasContainer = document.createElement("div");
    canvasContainer.setAttribute("class", "mapTile");
    canvasContainer.innerHTML = "<canvas id='canvas-" + id + "' onmousedown='startDrag(event);'></canvas>";
	
	document.getElementById("mapSpace").appendChild(canvasContainer);
	
	var canvas = document.getElementById("canvas-" + id);
	canvas.width = 128;
	canvas.height = 128;
	var ctx = canvas.getContext("2d");
	
	//ctx.fillStyle = "#FF0000";
	
	//console.log(palette[0][1][0]);
	
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

var gameBitsyVersion; //might be useful later on
var gameRoomFormat; //might be useful later on

var gameTitle;

// initialize game palettes object with default value
var gamePalettes = { default : [[0,82,204],[128,159,255],[255,255,255]] };
var gameRooms = {};
var gameTiles = {};
var gameSprites = {};

function load()
{
	
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
	
function parse()
{	
	
	if(gameTitle)
	{
		//TODO: check if already loaded and ask before overwriting?
		//break
	}
	
	var rawData = document.getElementById("datafield").value;
	
	//get BITSY VERSION and ROOM_FORMAT flags with regex
	var gameBitsyVersion = /# BITSY VERSION (.*)/.exec(rawData)[1];
	var gameRoomFormat = /! ROOM_FORMAT (.*)/.exec(rawData)[1];
	
	
	var dataArray = rawData.split('\n\n');
	
	console.log(dataArray);
	
	//get GAME TITLE
	gameTitle = dataArray[0];
	document.getElementById("title").innerHTML = gameTitle;
	
	
	var paletteRegex = /PAL (.+)\n(?:NAME.*\n)?(.+),(.+),(.+)\n(.+),(.+),(.+)\n(.+),(.+),(.+)/;
	var roomRegex = /ROOM (.+)\n((?:(?:.+(?:,.+){15})(?:|\n)){16})(?:.|\n)*PAL (.+)/;
	var tileRegex = /TIL (.+)\n((?:\d{8}(?:|\n)){8})/;
	var spriteRegex = /SPR (.+)\n((?:\d{8}(?:|\n)){8})(?:.|\n)*POS (.*) (.*),(.*)/;
	
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
			
			gameRooms[output[1]] = [roomArray, output[3]];
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
			console.log(output[1]);
			gameSprites[output[1]] = [spriteArray, output[3], [output[4], output[5]]];
			//{ id : [[[0,0,0,1,0,1,1,0], [], [], ... ], map id, [x, y]] }
			
		}
		
	}
	
}




//"#"+((1<<24)*Math.random()|0).toString(16)
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

