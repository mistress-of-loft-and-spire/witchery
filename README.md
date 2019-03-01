# ![](https://voec.github.io/witchery/img/cat.gif) overworld witchery
a small tool for connecting [bitsy](https://ledoux.itch.io/bitsy) rooms.  
load in some game data, arrange your rooms and overworld witchery will do all the magic.

try it out over here: [https://voec.github.io/witchery/](https://voec.github.io/witchery/)

***i'm not actively working on this anymore, but with a few caveats witchery can already be used.***

***most importantly keep in mind, that witchery doesn't remove previously generated exits. so once you write them into your gamedata, you can not change your room layout afterwards (unless you manually remove all exits before regenerating them).***

***i suggest keeping a backup of your gamedata. and aside from that you may have to manually make some adjustments to your gamedata if need be.***

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
