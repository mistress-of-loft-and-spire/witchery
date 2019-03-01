
// SHOWING DIALOGS

function show(e, animate = true)
{
	e.style.display = "block";
	
	bringToTop(e)
	
	if(animate) e.style.animation = "wobble 0.3s 1";
	
	var button = document.getElementById(e.id + "Button");
	button.style.color = "#fff";
	button.style.background = "#413359";
	
	storeDialog(e.id, "display", "block");
}

function hide(e)
{
	e.style.display = "none";
	
	var button = document.getElementById(e.id + "Button");
	button.style.color = "";
	button.style.background = "";
	
	storeDialog(e.id, "display", "none");
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

function bringToTop2(item2)
{
	var item = document.getElementById(item2);
	
	topZ += 1;
	item.style.zIndex = topZ;
}


// CLICKED FIELD IN DIALOG

function dialogField(e)
{
	storeDialog(e.target.id, "width", e.target.style.width);
	storeDialog(e.target.id, "height", e.target.style.height);
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


function startDrag(e)
{
	//window.alert("sometext");
	
	if (dragDialog != null) return;
	
	if (e.target.className == "close") return; //exception for title bar close button
	
	dragDialog = e.target.parentElement;
	
	if (e.target.className == "icon") dragDialog = e.target.parentElement.parentElement;
	
	//document.getElementById("listPanel").appendChild(dragDialog);
	
	dragDialog.style.cursor = "move";
	
	previousPos.x = null;
	previousPos.y = null;
	
	dragDialog.style.transition = "left 0s, top 0s";
	
	dragOffset.x = e.screenX - dragDialog.offsetLeft;
	dragOffset.y = e.screenY - dragDialog.offsetTop;
	
	bringToTop(dragDialog);
	
	if (dragDialog.classList.contains("mapTile"))
	{
		
		/*
		dragMouseLast.x = dragDialog.parentElement.offsetLeft + document.getElementById("roomDialog").offsetLeft;
		dragMouseLast.y = dragDialog.parentElement.offsetTop + document.getElementById("roomDialog").offsetTop;*/
		
		scrollOffset.x = document.getElementById("mainPanel").scrollLeft;
		scrollOffset.y = document.getElementById("mainPanel").scrollTop;
		
		if (dragDialog.classList.contains("inList"))
		{
			var rect1 = dragDialog.getBoundingClientRect();
			
			dragOffset.x = e.screenX - rect1.left + 30;
			dragOffset.y = e.screenY - rect1.top + 118;
			
			scrollOffset.x = 0;
			scrollOffset.y = 0;
			
			dragDialog.classList.remove("inList");
			
			document.getElementById("mapSpace").appendChild(dragDialog);
		}
		else
		{
			previousPos.x = dragDialog.offsetLeft;
			previousPos.y = dragDialog.offsetTop;
		}
	}
	
	moveDrag(e);
	
}


function fieldDragIn(e) 
{
	document.getElementById("debugCanvas").parentElement.style.display = "inline";
	console.log("test");
}

var there = document.createElement("div");
    there.setAttribute("class", "mapTile inList");
    there.innerHTML = "<canvas id='canvasDebug'></canvas>";
	
var previousPos = {x:0, y:0};

function moveDrag(e) 
{
	if (dragDialog == null) return;
	
	dragPosition.x = e.screenX - dragOffset.x;
	dragPosition.y = e.screenY - dragOffset.y;
	
	if (dragDialog.classList.contains("mapTile"))
	{
		dragPosition.x -= scrollOffset.x - document.getElementById("mainPanel").scrollLeft;
		dragPosition.y -= scrollOffset.y - document.getElementById("mainPanel").scrollTop;
	}
	
	if(dragPosition.y < 0) dragPosition.y = 0;
	
	dragDialog.style.left = dragPosition.x + "px";
	dragDialog.style.top = dragPosition.y + "px";
	
	var rect1 = dragDialog.getBoundingClientRect();
	var rect2 = document.getElementById("roomfield").getBoundingClientRect();
	
	var rectOffset = (canvasSize * (0.5 * zoomFactor));
	
	var overlap = !(rect1.right + rectOffset < rect2.left || 
                rect1.left + rectOffset > rect2.right || 
                rect1.bottom + rectOffset < rect2.top || 
                rect1.top + rectOffset > rect2.bottom )
				
	if (overlap) {
		dragDialog.classList.add("transparent");
	}
	else {
		
		dragDialog.classList.remove("transparent");
	}
	
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
	
	dragDialog.style.transition = "left 0.1s, top 0.1s";
	
	if (dragDialog.classList.contains("mapTile")) //dragging map tile
	{
		
		var rect1 = dragDialog.getBoundingClientRect();
		var rect2 = document.getElementById("roomfield").getBoundingClientRect();
		
		var rectOffset = (canvasSize * (0.5 * zoomFactor));
		
		var overlap = !(rect1.right + rectOffset < rect2.left || 
				rect1.left + rectOffset > rect2.right || 
				rect1.bottom + rectOffset < rect2.top || 
				rect1.top + rectOffset > rect2.bottom )
			
		if (overlap)
		{
			dragDialog.className = "mapTile inList";
			dragDialog.style.left = "0px";
			dragDialog.style.top = "0px";
			document.getElementById("roomfield").appendChild(dragDialog);
			
			delete roomLayout[dragDialog.dataset.room];
		}
		else
		{
			if (dragPosition.x <= 0) dragPosition.x = 0;
			if (dragPosition.y <= 0)  dragPosition.y = 0;
			
			dragPosition.x = Math.round(dragPosition.x / 131);  // TODO: check 131?
			dragPosition.y = Math.round(dragPosition.y / 131);
			
			var i = 0;
			
			for (i in roomLayout)
			{
				if (i != dragDialog.dataset.room && roomLayout[i][0] == dragPosition.x && roomLayout[i][1] == dragPosition.y)
				{
					targetRoom = document.getElementById("canvas-" + i).parentElement;
					
					if(previousPos.x != null)
					{
						targetRoom.style.left = previousPos.x + "px";
						targetRoom.style.top = previousPos.y + "px";
						
						targetRoom.style.zIndex = Math.round(previousPos.y / 131);
						
						setLayout(targetRoom, {x: Math.round(previousPos.x / 131), y: Math.round(previousPos.y / 131)});
					}
					else
					{
						targetRoom.className = "mapTile inList";
						targetRoom.style.left = "0px";
						targetRoom.style.top = "0px";
						document.getElementById("roomfield").appendChild(targetRoom);
						
						delete roomLayout[targetRoom.dataset.room];
					}
				}
			}
				
			dragDialog.style.left = dragPosition.x * 131 + "px";
			dragDialog.style.top = dragPosition.y * 131 + "px";
			
			dragDialog.style.zIndex = dragPosition.y;
			
			//checkExits(dragDialog.dataset.room, dragPosition, null);
			
			setLayout(dragDialog, dragPosition);
		}
		
	}
	else //dragging dialog window
	{
		
		clampInWindowRect(dragDialog);
		
		storeDialog(dragDialog.id, "left", dragDialog.style.left);
		storeDialog(dragDialog.id, "top", dragDialog.style.top);
		
	}

	dragDialog = null;
}


function setLayout(roomTile, roomPosition)
{
	
	roomLayout[roomTile.dataset.room] = [roomPosition.x, roomPosition.y]
	roomLayout[roomTile.dataset.room] = [roomPosition.x, roomPosition.y]
	
}


// MAKE SURE DIALOG BOX IS WITHIN BROWSER WINDOW BOUNDARIES

function clampInWindowRect(dialog)
{

	var windowRect = document.getElementById("appWindow").getBoundingClientRect();
	var dialogRect = dialog.getBoundingClientRect();
	
	if (dialogRect.left < 0) dialog.style.left = "0px";
	if (dialogRect.top < 0)  dialog.style.top = "0px";
	
	if (dialogRect.top + 48 > windowRect.bottom)  dialog.style.top = windowRect.bottom - 48 + "px";
	if (dialogRect.right > windowRect.right) dialog.style.left = windowRect.right - dialogRect.right + dialogRect.left + "px";	
	
}

function clampAll()
{
	
	clampInWindowRect(document.getElementById("dataDialog"));
	clampInWindowRect(document.getElementById("roomDialog"));
	clampInWindowRect(document.getElementById("aboutDialog"));
}
	

window.addEventListener("resize", clampAll);

