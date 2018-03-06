
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
var dragMouseLast = {x:0, y:0};
var dragPosition = {x:0, y:0};

document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", endDrag);

//document.addEventListener('touchstart', startDrag, false);   touch drag, doesn't work?

document.addEventListener('touchmove', moveDrag);
document.addEventListener('touchend', endDrag);

var topZ = 10000;


function startDrag(e)
{
	//window.alert("sometext");
	
	if (dragDialog != null) return;
	
	if (e.target.className == "close") return; //exception for title bar close button
	
	dragDialog = e.target.parentElement;
	
	dragDialog.style.cursor = "move";
	
	dragDialog.style.transitionDuration = "0.0s";
	
	dragPosition.x = dragDialog.offsetLeft;
	dragPosition.y = dragDialog.offsetTop;
	
	dragMouseLast.x = e.screenX;
	dragMouseLast.y = e.screenY;
	
	bringToTop(dragDialog);
	
}


function moveDrag(e) 
{
	if (dragDialog == null) return;
	
	
	dragPosition.x += e.screenX - dragMouseLast.x;
	dragPosition.y += e.screenY - dragMouseLast.y;
	
	dragDialog.style.left = dragPosition.x + "px";
	dragDialog.style.top = dragPosition.y + "px";
	
	dragMouseLast.x = e.screenX;
	dragMouseLast.y = e.screenY;
}


function endDrag(e)
{
	if (dragDialog == null) return;
	
	
	dragDialog.style.cursor = "default";
	
	dragDialog.style.transitionDuration = "0.2s";
	
	if (dragDialog.className == "mapTile") //dragging map tile
	{
		console.log(dragPosition.y);
		
		if (dragPosition.x <= 0) dragPosition.x = 0;
		if (dragPosition.y <= 0)  dragPosition.y = 0;
		
		dragDialog.style.left = Math.round(dragPosition.x / 131) * 131 + "px";
		dragDialog.style.top = Math.round(dragPosition.y / 131) * 131 + "px";
		
		dragDialog.style.zIndex = Math.round(dragPosition.y / 131);
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