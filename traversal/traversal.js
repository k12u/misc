var WIDTH = 10;
var HEIGHT = 10;
var unit = 60;
var ball = [8,5];

function createField(line) {
    var field = $(document.createElement('div'));
    for (var i = 0; i < WIDTH; i++) {
        var row = $(document.createElement('div'));
        field.append(row);
        for (var j = 0; j < HEIGHT; j++) {
            var online = false;
            for(var k = 0; k < line.length; k++) {
                if (line[k][0] == i && line[k][1] == j) {
                    online = true;
                }
            }
            var cell = $(document.createElement('div'));
            cell
                .text(i+":"+j)
                .css("background-color", online ? "#cccc00" : ((i+j) % 2 == 0) ? "#88e02e" : "#44c02e")
                .css("position", "absolute")
                .css("top", j * unit + "px")
                .css("left", i * unit + "px")
                .css("width", unit+"px")
                .css("height", unit+"px")
                .css("font-sze", "10px");
            row.append(cell);
        }
    }
    return field;
}

function line(x0, y0, x1, y1){
    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx-dy;

    var arr = [];
    while(true){
        arr.push([x0, y0]);
        //setPixel(x0,y0);  // Do what you need to for this

        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
    }
    return arr;
}

var linedata = line(0, 0, 1, 8);

console.log("time: " + new Date().getTime());
for (var i = 0; i < 100; i++) {
    line(0, 0, 1, 8);
}
console.log("time: " + new Date().getTime());

var field = createField(linedata);
$("body").append(field);
