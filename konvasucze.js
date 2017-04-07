var posX; // mouse coordinates
var posY;
var coordinates = [];
var id;
var point;
var Line;
var index = 0;

function konvaInitialize(){        //create Canvas

    var stage = new Konva.Stage({  // create stage
        container: 'container',   
        width: window.innerWidth,
        height: window.innerHeight
        });
    var layer = new Konva.Layer(); // create layers
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
    
// add the board to the layer
        layer.add(board);
// add the layer to the stage
        stage.add(layer, lineLayer, pointLayer);
       
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
        coordinates.push(posX);
        coordinates.push(posY);
        console.log(coordinates +" "+ index);
        index ++;
    
    
/* ~~~~~~~~~~~~~~~ onMouseOver behavior ~~ */  
    point.on('mouseover', function(){
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(6);
        this.opacity(1);
        this.radius(13);
        id = this.getId();
        pointLayer.draw();
        console.log("index: " + id);
        });
    
/* ~~~~~~~~~~~~~~~ onMouseOut behavior ~~ */
    point.on('mouseout', function(){
        document.body.style.cursor = 'default';
        this.setStrokeWidth(4);
        this.opacity(0.8);
        this.radius(10);
        pointLayer.draw();
        });
    
    point.on('dragend', function() {
            var coordX = posX;
            var coordY = posY;
          //  pointLayer.draw();
            updatePoints(id);
        });
    
     pointLayer.on('beforeDraw', function() {
         //updatePoints(id);
            //dsfdsf sdf dsfs
    });
}
/* ~~~~~~~~~~~~~~~ Add Line ~~ */
function addLine(){
        Line = new Konva.Line({
            points: coordinates,
            stroke: 'green',
            strokeWidth: 7,
            lineCap: 'round',
            lineJoin: 'round'
            });
}
    
function updatePoints(idx){
        console.log(idx);
        coordinates[2 * idx] =  posX;
        coordinates[(2 * idx) + 1] = posY;
        lineLayer.draw();

}


}
/* ~~~~~~~~~~~~~~~~ Detect mouse coordinates ~~ */
    document.onmousemove = function(mouse){
        posX = mouse.pageX;
        posY = mouse.pageY;
        }
