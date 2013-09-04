var WIDTH = 20;
var HEIGHT = 20;
var unit = 30;
var linespec = [4, 4, 18, 14];

function createField(line) {
    var field = $('div');
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
                //.text(i+":"+j)
                .css("background-color", online ? "#cccc00"
                     : ((i+j) % 2 == 0) ? "#88e02e" : "#44c02e")
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

function line(linespec) {
    var x0 = linespec[0];
    var y0 = linespec[1];
    var x1 = linespec[2];
    var y1 = linespec[3];

    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;
    var err_prev;
    var dx2 = dx * 2;
    var dy2 = dy * 2;
    var x = x0, y = y0;

    var arr = [[x0, y0]];
    if (dx >= dy) {
        console.log("1");
        err_prev = err = dx;
        for (i=0 ; i < dx ; i++){
            x += sx;
            err += dy2;
            if (err > dx2) {
                y += sy;
                err -= dx2;
                if (err + err_prev < dx2)
                    arr.push([y-sy, x]);
                else if (err + err_prev > dx2)
                    arr.push([y, x-sx]);
                else {
                    arr.push([y-sy, x]);
                    arr.push([y, x-sx]);
                }
            }
            arr.push([y, x]);
        }
    } else {
        console.log("2");
    }
    return arr;
}

var linedata = line(linespec);

console.log("time: " + new Date().getTime());

for (var l = 0; l < 10; l++) {
    line(linespec);
}
console.log("time: " + new Date().getTime());

function addcanvasline(canvas, linespec) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();

    ctx.moveTo(0,0);
    ctx.moveTo(linespec[0]*unit+unit/2, linespec[1]*unit+unit/2);
    ctx.lineTo(linespec[3]*unit+unit/2, linespec[2]*unit+unit/2);
    ctx.closePath();

    ctx.stroke();
}

var field = createField(linedata);
var linecanvas = $("canvas")[0];
$("body").append(linecanvas);
addcanvasline(linecanvas, linespec);
$("body").append(field);
