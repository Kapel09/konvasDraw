var posX; // mouse coordinates
var posY;
var line1; 
var line2;
var coordinates1X; // line1 coordinates
var coordinates1Y;
var coordinates2X; // line2 coordinates
var coordinates2Y;
var id;     // point id
var point;  
var Line;
var index = 0; // counter

function konvaInitialize(){          //create Canvas

    var stage = new Konva.Stage({    // create stage
        container: 'container',   
        width: window.innerWidth,
        height: window.innerHeight
        });
    var layer = new Konva.Layer();    // create layers
    var pointLayer = new Konva.Layer(); 
    var lineLayer = new Konva.Layer();
    var board = new Konva.Rect({   // create board
        x: 100,
        y: 50,
        width: window.innerWidth - 200,
        height: window.innerHeight - 100,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4
        });
    
        layer.add(board); // add the board to the layer
        stage.add(layer, lineLayer, pointLayer); // add the layer to the stage
       
/* ~~~~~~~~~~~~~~~~ onMouseClick behavior ~~ */ 
    board.on('click', function(){  
        addPoint(); // create Point
        addLine(); // create line          

        // Add elements to canvas 
        lineLayer.add(Line);
        lineLayer.draw();
        pointLayer.add(point);
        pointLayer.draw();
})
    
/* ~~~~~~~~~~~~~~~ Add new point ~~ */   
function addPoint(){
    point = new Konva.Circle({
            x: posX,
            y: posY,
            radius: 10,
            fill: 'gray',
            stroke: 'black',
            strokeWidth: 4,
            draggable: 'true',
            opacity: 0.8,
            id: index
            });
        coordinates1X = coordinates2X;
        coordinates1Y = coordinates2Y;
        coordinates2X = posX;
        coordinates2Y = posY;
        console.log(coordinates1X + " "+ coordinates1Y + " dwaa: " + coordinates2X + " " + coordinates2Y+" "+ index);
        index ++;
    
    
/* ~~~~~~~~~~~~~~~ onMouseOver behavior ~~ */  
    point.on('mouseover', function(){
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(6);
        this.opacity(1);
        this.radius(13);
        id = this.getId();
        pointLayer.draw();
        console.log("id: " + id);
        });
    
/* ~~~~~~~~~~~~~~~ onMouseOut behavior ~~ */
    point.on('mouseout', function(){
        document.body.style.cursor = 'default';
        this.setStrokeWidth(4);
        this.opacity(0.8);
        this.radius(10);
        pointLayer.draw();
        });
/* ~~~~~~~~~~~~~~~ onDragMove behavior ~~ */
    point.on('dragmove', function() {
         var pX = this.getX();
         var pY = this.getY();
         updatePoints(id, pX, pY);
        });
}
/* ~~~~~~~~~~~~~~~ Add Line ~~ */
function addLine(){
    Line = new Konva.Line({
        points: [coordinates1X, coordinates1Y, coordinates2X, coordinates2Y],
        stroke: '#070a43',
        strokeWidth: 7,
        lineCap: 'round',
        ineJoin: 'round'
        });
    
    Line.on('mouseup', function(){
            console.log(this);
            var lineId = this.index;
            console.log("id lini: " + lineId);
    });
    
}
/* ~~~~~~~~~~~~~~~ Update Point/Line ~~ */
function updatePoints(idx, pX, pY){
    line1 = stage.find('Line')[idx];
        console.log('index: ' + index + ' idx: ' + idx);
        line1.attrs.points[2]= pX;
        line1.attrs.points[3]= pY;
    line2 = stage.find('Line')[idx + 1];

    if(idx + 1 < index){         // if point is not last
        line2.attrs.points[0]= pX;
        line2.attrs.points[1]= pY;
        }
    else {
        coordinates2X = line1.attrs.points[2];
        coordinates2Y = line1.attrs.points[3];
        }
    lineLayer.draw();
}
    
    
}
/* ~~~~~~~~~~~~~~~~ Detect mouse coordinates ~~ */
document.onmousemove = function(mouse){
        posX = mouse.pageX;
        posY = mouse.pageY;
        }