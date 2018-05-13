
// SAVE DIALOG SETTING BETWEEN SESSIONS

function storeDialog(dialog, setting, value)
{
	if (typeof(Storage) !== "undefined")
	{
		
		localStorage.setItem(dialog + setting, value);
		
	}
}

// RESTORE DIALOG SETTING

function setDialog(dialog, setting)
{
	if (typeof(Storage) !== "undefined" && localStorage.getItem(dialog + setting))
	{
		// see https://stackoverflow.com/a/3968772
		document.getElementById(dialog).style.cssText += ";" + setting + ": " + localStorage.getItem(dialog + setting) + ";";
	}
}

// RESTORE ALL PREVIOUS DIALOG SETTINGS

function restoreAllDialogs()
{
	setDialog("dataDialog", "display");
	setDialog("dataDialog", "left");
	setDialog("dataDialog", "right");
	setDialog("datafield", "width");
	setDialog("datafield", "height");
	
	setDialog("roomDialog", "left");
	setDialog("roomDialog", "right");
	setDialog("roomDialog", "display");
	setDialog("roomfield", "width");
	setDialog("roomfield", "height");
}