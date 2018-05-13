
// SAVE DIALOG SETTING BETWEEN SESSIONS

function storeDialog(dialog, setting, value)
{
	if (typeof(Storage) !== "undefined")
	{
		
		localStorage.setItem(dialog + setting, value);
		
	}
}

// RESTORE DIALOG SETTING

function restoreDialog(dialog, setting)
{
	if (typeof(Storage) !== "undefined")
	{
	
		var storedValue = localStorage.getItem(dialog + setting);
		
		if(storedValue)
		{
			if(setting == "display")
			{
				if(storedValue == "block") show(document.getElementById(dialog), false);
				else 					   hide(document.getElementById(dialog));
			}
			else
			{
				// see https://stackoverflow.com/a/3968772
				document.getElementById(dialog).style.cssText += ";" + setting + ": " + storedValue + ";";
			}
		}
	}
}

// RESTORE ALL PREVIOUS DIALOG SETTINGS

function restoreAllDialogs()
{
	
	restoreDialog("dataDialog", "display");
	restoreDialog("dataDialog", "left");
	restoreDialog("dataDialog", "top");
	restoreDialog("datafield", "width");
	restoreDialog("datafield", "height");
	
	restoreDialog("roomDialog", "left");
	restoreDialog("roomDialog", "top");
	restoreDialog("roomDialog", "display");
	restoreDialog("roomfield", "width");
	restoreDialog("roomfield", "height");
	
	restoreDialog("aboutDialog", "display");
	restoreDialog("aboutDialog", "left");
	restoreDialog("aboutDialog", "top");
}

// CLEAR ALL PREVIOUSLY STORED SETTINGS, unused for now

function clearStorage()
{
	localStorage.clear();
}
