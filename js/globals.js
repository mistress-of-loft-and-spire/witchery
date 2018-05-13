
// witchery version
var version = "0.7 BETA";


// raw bitsy game data
var rawData;

// some metadata, unused for now
var gameBitsyVersion;
var gameRoomFormat;
var gameWitcheryVersion; // version of witchery with which layout metadata was last edited

var gameTitle;

// game data arrays
var gamePalettes = {}; // default : [[0,82,204],[128,159,255],[255,255,255]]
var gameRooms = {};
var gameTiles = {};
var gameSprites = {};

// room layout saved in witchery metadata (used to remember layout when reimporting)
var roomLayout = {};


// room tile scaling
var canvasSize = 128;
var zoomFactor = 1;


// witchery init
function start()
{
	restoreAllDialogs(); // in ui-storage.js
	load(); // in bitsy.js
}