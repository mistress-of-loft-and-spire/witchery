
// SHOWING DIALOGS

function show(e)
{
	e.style.display = "block";
	
	bringToTop(e)
	
	e.style.animation = "wobble 0.3s 1";
	
	var button = document.getElementById(e.id + "Button");
	button.style.color = "#fff";
	button.style.background = "#413359";
}

function hide(e)
{
	e.style.display = "none";
	
	var button = document.getElementById(e.id + "Button");
	button.style.color = "";
	button.style.background = "";
}

function toggle(e)
{
	if (e.style.display == "none")
	{
		show(e);
	}
	else
	{
		hide(e);
	}
}



function bringToTop(item)
{
	topZ += 1;
	item.style.zIndex = topZ;
}



// DRAGGING ELEMENTS

var dragDialog = null;
var dragOffset = {x:0, y:0};
var scrollOffset = {x:0, y:0};
var dragPosition = {x:0, y:0};

document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", endDrag);

//document.addEventListener('touchstart', startDrag, false);   touch drag, doesn't work?

document.addEventListener('touchmove', moveDrag);
document.addEventListener('touchend', endDrag);

var topZ = 10000;
/*
function listDrag(e)
{
	
	if (dragDialog != null) return;
	
	e.target.style.opacity = 0.5;
	
	dragDialog = document.getElementById("canvasa").parentElement;
	
	dragDialog.style.cursor = "move";
	
	dragDialog.style.transitionDuration = "0.0s";
	
	dragDialog.style.left = e.screenX + "px";
	dragDialog.style.top  = 0 + "px";
	
	dragPosition.x = dragDialog.offsetLeft;
	dragPosition.y = dragDialog.offsetTop;
	
	dragOffset.x = e.screenX;
	dragOffset.y = e.screenY;
	
	bringToTop(dragDialog);
	
}*/


function startDrag(e)
{
	//window.alert("sometext");
	
	if (dragDialog != null) return;
	
	if (e.target.className == "close") return; //exception for title bar close button
	
	dragDialog = e.target.parentElement;
	
	if (e.target.className == "icon") dragDialog = e.target.parentElement.parentElement;
	
	//document.getElementById("listPanel").appendChild(dragDialog);
	
	if (dragDialog.className == "mapTile settled") dragDialog.className = "mapTile";
	
	dragDialog.style.cursor = "move";
	
	dragDialog.style.transition = "left 0s, top 0s";
	
	dragOffset.x = e.screenX - dragDialog.offsetLeft;
	dragOffset.y = e.screenY - dragDialog.offsetTop;
	
	bringToTop(dragDialog);
	
	if (dragDialog.className == "mapTile")
	{
		
		/*
		dragMouseLast.x = dragDialog.parentElement.offsetLeft + document.getElementById("roomsDialog").offsetLeft;
		dragMouseLast.y = dragDialog.parentElement.offsetTop + document.getElementById("roomsDialog").offsetTop;*/
		
		scrollOffset.x = document.getElementById("mainPanel").scrollLeft;
		scrollOffset.y = document.getElementById("mainPanel").scrollTop;
		
		
		document.getElementById("mapSpace").appendChild(dragDialog);
	}
	
}


function fieldDragIn(e) 
{
	document.getElementById("debugCanvas").parentElement.style.display = "inline";
	console.log("test");
}

function moveDrag(e) 
{
	if (dragDialog == null) return;
	
	dragPosition.x = e.screenX - dragOffset.x;
	dragPosition.y = e.screenY - dragOffset.y;
	
	if (dragDialog.className == "mapTile")
	{
		dragPosition.x -= scrollOffset.x - document.getElementById("mainPanel").scrollLeft;
		dragPosition.y -= scrollOffset.y - document.getElementById("mainPanel").scrollTop;
	}
	
	dragDialog.style.left = dragPosition.x + "px";
	dragDialog.style.top = dragPosition.y + "px";
	
	/*
	if(dragPosition.y - document.getElementById("mainPanel").scrollTop < 0)
	{
		
		console.log(e.pageY + "    " + dragDialog.parentElement.id);
		
		if(dragDialog.parentElement.id != "listPanel")
		{

			document.getElementById("listPanel").appendChild(dragDialog);
			
			//dragDialog.style.animation = "wobble 0.3s 1";
			
		}
		
		//dragDialog.style.left = "0px";
		//dragDialog.style.top = "0px";
	}
	else
	{
		document.getElementById("mapSpace").appendChild(dragDialog);
	}*/
	
}


function endDrag(e)
{
	if (dragDialog == null) return;
	
	
	dragDialog.style.cursor = "default";
	
	dragDialog.style.transition = "left 0.2s, top 0.2s";
	
	if (dragDialog.className == "mapTile") //dragging map tile
	{
		console.log(dragPosition.y);
		
		/*if(dragDialog.parentElement.id == "listPanel")
		{
			dragDialog.className = "mapTile settled";
		}*/
		
		var rect1 = dragDialog.getBoundingClientRect();
		var rect2 = document.getElementById("roomfield").getBoundingClientRect();
	
		var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom)
		
		if (overlap)
		{
			dragDialog.className = "mapTile settled";
			dragDialog.style.left = "0px";
			dragDialog.style.top = "0px";
			document.getElementById("roomfield").appendChild(dragDialog);
		}
		else
		{
		
			if (dragPosition.x <= 0) dragPosition.x = 0;
			if (dragPosition.y <= 0)  dragPosition.y = 0;
			
			dragDialog.style.left = Math.round(dragPosition.x / 131) * 131 + "px";
			dragDialog.style.top = Math.round(dragPosition.y / 131) * 131 + "px";
			
			dragDialog.style.zIndex = Math.round(dragPosition.y / 131);
		}
	}
	else //dragging dialog window
	{
		
		var windowBox = document.getElementById("appWindow").getBoundingClientRect();
		var dialogBox = dragDialog.getBoundingClientRect();
		
		//check if in browser window
		if (dialogBox.left <= 0) dragDialog.style.left = "0px";
		if (dialogBox.top <= 0)  dragDialog.style.top = "0px";
		if (dialogBox.right > windowBox.right) dragDialog.style.left = windowBox.right - dialogBox.right + dialogBox.left + "px";
		if (dialogBox.bottom > windowBox.bottom)  dragDialog.style.top = windowBox.bottom - dialogBox.bottom + dialogBox.top + "px";
	}

	dragDialog = null;
}