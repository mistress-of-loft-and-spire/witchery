
var version = "0.4 BETA";

var canvas;
var palette = {	0 : [[0,82,204],[128,159,255],[255,255,255]] };// default palette


var testTile = [[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,0,1,1,1,1,0,1],[0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0]];

var testMap = [["a","a","a","a",0,0,"a",0,0,0,"a",0,0,0,0,0],[0,"a","a","a","a","a","a","a","a","a","a","a","a","a","a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,"a",0,0,0,0,0,"a",0],[0,"a",0,0,0,0,"a","a","a",0,0,0,0,0,"a",0],[0,"a",0,0,0,0,"a",0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,"a","a",0,0,0,0,0,0,0,"a",0],[0,"a","a",0,"a",0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,"a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,"a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,"a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a","a","a","a","a","a","a","a","a","a","a","a",0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

var scale = 1;

// palette[ id ].colors;

function start()
{
	go("canvas");
	go("canvasa");
	go("canvasb");
	go("canvasc");
	go("canvasx");
	go("canvasxa");
	go("canvasxb");
	go("canvasxc");
}

function go(myname)
{
	var canvas = document.getElementById(myname);
	canvas.width = 128;
	canvas.height = 128;
	var ctx = canvas.getContext("2d");
	
	//ctx.fillStyle = "#FF0000";
	
	//console.log(palette[0][1][0]);
	
	setColor(0, 0, ctx);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	setColor(0, 1, ctx);
	
	var i = 0;
	var j = 0;
	
	for(i in testMap)
	{
		for (j in testMap[i])
		{
			if (testMap[i][j] == "a")
			{
				drawTile(testTile, j, i, ctx);
			}
		}
	}
	
	/*
	for (i in room.tilemap) {
		for (j in room.tilemap[i]) {
			var id = room.tilemap[i][j];
			if (id != "0") {
				//console.log(id);
				if (tile[id] == null) { // hack-around to avoid corrupting files (not a solution though!)
					id = "0";
					room.tilemap[i][j] = id;
				}
				else {
					// console.log(id);
					drawTile( getTileImage(tile[id],getRoomPal(room.id)), j, i, context );
				}
			}
		}
	}*/
	
	//context.putImageData(img,x*tilesize*scale,y*tilesize*scale);
}

var canvasId = 0;

function load()
{
	
	//todo: check if already loaded and ask before overwriting
	
	canvasId += 1;
	
    var div = document.createElement("div");
	
    div.className = "mapTile";
	
    div.innerHTML = "<canvas id='canvas" + canvasId + "' onmousedown='startDrag(event);'></canvas>";
	
    document.getElementById("mapSpace").appendChild(div);
	
	
	
	
	var canvas = document.getElementById("canvas" + canvasId);
	canvas.width = 128;
	canvas.height = 128;
	var context = canvas.getContext("2d");
	
	//ctx.fillStyle = "#FF0000";
	
	
	
	context.fillStyle = getRandomColor();
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = getRandomColor();
	context.fillRect(16, 16, 16, 16);
	
	context.fillStyle = getRandomColor();
	
	
	
	var i = 0;
	var j = 0;
	
	for(i in testMap)
	{
		for (j in testMap[i])
		{
			if (testMap[i][j] == "a")
			{
				drawTile(testTile, j, i, context);
			}
		}
	}
	


//function removeRow(input) {
//    document.getElementById('content').removeChild( input.parentNode );
/*
var div = document.getElementById('xyz');
if (div) {
    div.parentNode.removeChild(div);
}
*/

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




function drawTile(tile, x, y, context)
{
	var i = 0;
	var j = 0;
	
	x = x * 8 * scale;
	y = y * 8 * scale;
	
	for(i in tile)
	{
		for (j in tile[i])
		{
			if (tile[i][j] == "1")
			{
				context.fillRect(x + (j * scale), y + (i * scale), scale, scale);
			}
		}
	}
}

function setColor(paletteNumber, colorNumber, context)
{
	context.fillStyle = "rgb(" + palette[paletteNumber][colorNumber][0] + "," + palette[paletteNumber][colorNumber][1] + "," + palette[paletteNumber][colorNumber][2] + ")";
}

function getTitle(data)
{
	
}