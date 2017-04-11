var posX, posY; // mouse coordinates
var line1, line2; // lines edited when point moved
var coordinates1X, coordinates1Y, coordinates2X, coordinates2Y; // new line coordinates
var id, lineId;     // poin id, line id
var point, Line;  // general point and line variable
var counter = 0; // points counter
var lineCounter = 0; // lines counter
var centricPoint = false; // is point added on existing line? 
var helpPoint;


function konvaInitialize(){          

    var stage = new Konva.Stage({    // create stage
        container: 'container',   
        width: window.innerWidth,
        height: window.innerHeight
        });
    var layer = new Konva.Layer();   
    var pointLayer = new Konva.Layer(); 
    var lineLayer = new Konva.Layer();
    var board = new Konva.Rect({   // create board
        width: window.innerWidth,
        height: window.innerHeight,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4
        });
      
        layer.add(board); 
        stage.add(layer, lineLayer, pointLayer); // add layers to the stage
       
//onMouseClick behavior   
    board.on('click', function(){  
        addPoint(); // create Point
        addLine(); // create line          

        // Add elements to canvas 
        lineLayer.add(Line);
        lineLayer.batchDraw();
        pointLayer.add(point);
        pointLayer.batchDraw();
    })
    
// Add new point  
function addPoint(){
    point = new Konva.Circle({
            x: posX,
            y: posY,
            radius: 10,
            fill: 'gray',
            stroke: 'black',
            strokeWidth: 4,
            draggable: 'true',
            opacity: 0.8
            });

    if(centricPoint == false){  // if point added on board
        coordinates1X = coordinates2X;
        coordinates1Y = coordinates2Y;
        coordinates2X = posX;
        coordinates2Y = posY;
        counter ++;
        
    } else{                  // point added on existing line
        pointLayer.add(point);
        pointLayer.batchDraw();
        point.setZIndex(lineId);
        
        // create first line
        helpPoint = stage.find('Circle')[lineId - 1]; 
        coordinates1X = helpPoint.getX();
        coordinates1Y = helpPoint.getY();
        coordinates2X = point.getX();
        coordinates2Y = point.getY();
        addLine();
        lineLayer.add(Line);
        lineLayer.batchDraw();
        Line.setZIndex(lineId);
        
        // create second line
        helpPoint = stage.find('Circle')[lineId + 1];
        coordinates1X = coordinates2X;
        coordinates1Y = coordinates2Y;
        coordinates2X = helpPoint.getX();
        coordinates2Y = helpPoint.getY();
        addLine();
        lineLayer.add(Line);
        lineLayer.batchDraw();
        Line.setZIndex(lineId + 1);
        
        centricPoint = false; 
        counter ++;
       
        // detect point with highest index (last)
        helpPoint = stage.find('Circle')[lineCounter - 1];
        coordinates2X = helpPoint.getX();
        coordinates2Y = helpPoint.getY(); 
    }
        pointLayer.draw();
    
// onMouseOver behavior   
    point.on('mouseover', function(){
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(6);
        this.opacity(1);
        this.radius(13);
        id = this.index;
        pointLayer.batchDraw();
    });
    
// onMouseOut behavior 
    point.on('mouseout', function(){
        document.body.style.cursor = 'default';
        this.setStrokeWidth(4);
        this.opacity(0.8);
        this.radius(10);
        pointLayer.batchDraw();
    });
// onDragMove behavior
    point.on('dragmove', function() {
         var pX = this.getX();
         var pY = this.getY();
         id = this.index;
         updatePoints(id, pX, pY);
    });
}
    
// Add new Line 
function addLine(){
    
    Line = new Konva.Line({
        points: [coordinates1X, coordinates1Y, coordinates2X, coordinates2Y],
        stroke: '#070a43',
        strokeWidth: 7,
        lineCap: 'round',
        ineJoin: 'round'
    });
         lineCounter += 1;

// on Click behavior 
    Line.on('mouseup', function(){
            lineId = this.index;
            this.destroy();
            lineCounter -= 1;
            lineLayer.batchDraw();
            centricPoint = true;
            addPoint();
    });
    
// onMouseOver behavior 
    Line.on('mouseover', function(){
        document.body.style.cursor = 'pointer';
        lineId = this.index;
        lineLayer.batchDraw();
    });
// onMouseOut behavior 
    Line.on('mouseout', function(){
        document.body.style.cursor = 'default';
    });   
}  
    
//Update Point/Line
function updatePoints(idx, pX, pY){
        line1 = stage.find('Line')[idx]; // detect first line which have be edited
        line1.attrs.points[2]= pX;
        line1.attrs.points[3]= pY;
    
    line2 = stage.find('Line')[idx + 1]; // detect first line which have be edited
    if(idx + 1 < counter){         
        line2.attrs.points[0]= pX;
        line2.attrs.points[1]= pY;
        }
    else { //  point is last
        coordinates2X = line1.attrs.points[2];
        coordinates2Y = line1.attrs.points[3];
        }
    lineLayer.batchDraw();
    }       
}
// Detect mouse coordinates
document.onmousemove = function(mouse){
        posX = mouse.pageX;
        posY = mouse.pageY;
        }