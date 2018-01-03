
// SHOWING DIALOGS

function show(e)
{
	e.style.display = "block";
	
	bringToTop(e)
	
	e.style.animation = "wobble 0.4s 1";
	
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

document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", endDrag);

var topZ = 10000;


function startDrag(e)
{
	if (dragDialog != null) return;
	
	if (e.target.className == "close") return; //exception for title bar close button
	
	dragDialog = e.target.parentElement;
	
	dragDialog.style.cursor = "move";
	
	var pos = dragDialog.getBoundingClientRect();
	
	dragOffset.x = e.clientX - pos.left;
	dragOffset.y = e.clientY - pos.top;
	
	bringToTop(dragDialog);
}


function moveDrag(e) 
{
	if (dragDialog == null) return;
	
	
	dragDialog.style.left = e.clientX - dragOffset.x + "px";
	dragDialog.style.top = e.clientY - dragOffset.y + "px";
}


function endDrag(e)
{
	if (dragDialog == null) return;
	
	
	dragDialog.style.cursor = "default";
	
	var pos = dragDialog.getBoundingClientRect();
	
	var appWindow = document.getElementById("appWindow").getBoundingClientRect();
	
	if (pos.left < 0) dragDialog.style.left = "0px";
	if (pos.top < 0)  dragDialog.style.top = "0px";
	if (pos.right > appWindow.right) dragDialog.style.left = appWindow.right - pos.right + pos.left + "px";
	if (pos.bottom > appWindow.bottom)  dragDialog.style.top = appWindow.bottom - pos.bottom + pos.top + "px";
	
	//dragDialog.style.animation = "wobble 0.4s 1";
	
	if (dragDialog.className == "mapTile")
	{
		dragDialog.style.left = Math.round(pos.left / 129) * 129 + "px";
		dragDialog.style.top = Math.round(pos.top / 129) * 129 + "px";
		
		dragDialog.style.zIndex = Math.round(pos.top / 129);
		
		dragDialog.style.position = "relative";
	}

	dragDialog = null;
}