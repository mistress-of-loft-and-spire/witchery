var version = "0.2 BETA";

var canvas;
var palette = {
	0 : [[0,82,204],[128,159,255],[255,255,255]] // default palette
};

var testTile = [[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,0,1,1,1,1,0,1],[0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0]];

var testMap = [["a","a","a","a",0,0,"a",0,0,0,"a",0,0,0,0,0],[0,"a","a","a","a","a","a","a","a","a","a","a","a","a","a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,"a",0,0,0,0,0,"a",0],[0,"a",0,0,0,0,"a","a","a",0,0,0,0,0,"a",0],[0,"a",0,0,0,0,"a",0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,"a","a",0,0,0,0,0,0,0,"a",0],[0,"a","a",0,"a","a",0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a","a",0,0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a",0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a",0,0,0,0,0,0,0,0,0,0,0,0,"a",0],[0,"a","a","a","a","a","a","a","a","a","a","a","a","a","a",0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

var scale = 1;

// palette[ id ].colors;

function start()
{
	var canvas = document.getElementById("canvas");
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




var dragDialog = null;
var dragOffset = {x:0, y:0};

function startDrag(e)
{
	if (dragDialog != null) return;
	
	
	dragDialog = e.target.parentElement;
	
	dragDialog.style.cursor = "move";
	
	var pos = dragDialog.getBoundingClientRect();
	
	dragOffset.x = e.clientX - pos.left;
	dragOffset.y = e.clientY - pos.top;
	
	//if (dragDialog.className == "mapTile") dragDialog.style.position = "absolute";
	
	/*grabbedDialog.card = e.target.parentElement.parentElement;
	grabbedDialog.size = getElementSize( grabbedDialog.card );
	var pos = getElementPosition( grabbedDialog.card );
	
	grabbedDialog.shadow = document.createElement("div");
	grabbedDialog.shadow.className = "DialogShadow";
	grabbedDialog.shadow.style.width = grabbedDialog.size.x + "px";
	grabbedDialog.shadow.style.height = grabbedDialog.size.y + "px";

	document.getElementById("editorContent").insertBefore( grabbedDialog.shadow, grabbedDialog.card );
	grabbedDialog.cursorOffset.x = e.clientX - pos.x;
	grabbedDialog.cursorOffset.y = e.clientY - pos.y;
	console.log("client " + e.clientX);
	console.log("card " + pos.x);
	console.log("offset " + grabbedDialog.cursorOffset.x);
	// console.log("screen " + e.screenX);
	grabbedDialog.card.style.position = "absolute";
	grabbedDialog.card.style.left = e.clientX - grabbedDialog.cursorOffset.x + "px";
	grabbedDialog.card.style.top = e.clientY - grabbedDialog.cursorOffset.y + "px";
	grabbedDialog.card.style.zIndex = 1000;*/
}

document.addEventListener("mousemove", moveDrag);

function moveDrag(e) 
{
	if (dragDialog == null) return;
	
	dragDialog.style.left = e.clientX - dragOffset.x + "px";
	dragDialog.style.top = e.clientY - dragOffset.y + "px";
}

document.addEventListener("mouseup", endDrag);

function endDrag(e)
{
	dragDialog.style.cursor = "default";
	
	var pos = dragDialog.getBoundingClientRect();
	
	var appWindow = document.getElementById("appWindow").getBoundingClientRect();
	
	if (pos.left < 0) dragDialog.style.left = "0px";
	if (pos.top < 0)  dragDialog.style.top = "0px";
	if (pos.right > appWindow.right) dragDialog.style.left = appWindow.right - pos.right + pos.left + "px";
	if (pos.bottom > appWindow.bottom)  dragDialog.style.top = appWindow.bottom - pos.bottom + pos.top + "px";
	
	if (dragDialog.className == "mapTile")
	{
		dragDialog.style.left = Math.round(pos.left / 133) * 133 + "px";
		dragDialog.style.top = Math.round(pos.top / 133) * 133 + "px";
		
		dragDialog.style.position = "relative";
	}

	dragDialog = null;
}