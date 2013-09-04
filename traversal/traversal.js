var WIDTH = 10;
var HEIGHT = 10;
var unit = 60;

function createField() {
    var field = $(document.createElement('div'));
    for (var i = 0; i < WIDTH; i++) {
        var row = $(document.createElement('div'));
        field.append(row);
        for (var j = 0; j < HEIGHT; j++) {
            var cell = $(document.createElement('div'));
            cell
                .text(i+":"+j)
                .css("background-color", ((i+j) % 2 == 0) ? "#88e02e" : "#44c02e")
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

var field = createField();

$("body").append(field);
