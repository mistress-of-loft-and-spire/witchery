# ![](https://voec.github.io/witchery/img/cat.gif) overworld witchery
a small tool for connecting [bitsy](https://ledoux.itch.io/bitsy) rooms.  
load in some game data, arrange your rooms and overworld witchery will do all the magic.

try it out over here: [https://voec.github.io/witchery/](https://voec.github.io/witchery/)

*this tool is still in development, check back later for more ;)*

## todo

- [x] how to lay out the rooms for selection?
- [x] save dialog positions between sessions
- [x] swap overlapping room tiles
- [x] save room layout in bitsy data?
- [x] layout generator
- [x] room exit generator
- [ ] room search & name display
- [ ] try out on-the-fly generation
- [ ] touch drag
- [ ] zoom
- [ ] group select
- [ ] show exit connections somehow?

## known issues

* buttons can be pressed by dragging a left click on them?
* significant lag when updating gamedata-field
* ups, i forgot items
* palettes with more than three colors not supported
* rooms with omitted palette id can not be read (how can this be regexed?)
* grid adjustation
* removed maps -> remove from layout
* check overlap on load

## contributing

please feel free to [report any issues](https://github.com/voec/witchery/issues).

code contributions and forks are very much welcome!
