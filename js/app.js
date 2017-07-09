// set canvas and context
var canvas = document.getElementById("canvas-container");
var ctx    = canvas.getContext("2d");

// set variables
const defaultWidth = 200;
const defaultHeight = 200;
var rectangles = new Array();
var lines = new Array();


// set default canvas width and height
$( document ).ready(function() {
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
});

// resets the canvas
$( "#resetCanvas" ).click(function( event ) {

  rectangles = [];
  lines = [];
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
  event.preventDefault();

});

// listen on properties form submit
$( "#canvasPropertiesForm" ).submit(function( event ) {

  let width = $( "#canvasWidth" ).val();
  let height = $( "#canvasHeight" ).val();
  setCanvas(width,height);
  event.preventDefault();

});

//create shapes on canvas
$( "#canvasAttributesForm" ).submit(function( event ) {

  let x1 = $( "#x1" ).val();
  let x2 = $( "#x2" ).val();
  let y1 = $( "#y1" ).val();
  let y2 = $( "#y2" ).val();
  let action = $( "#action" ).val();

  switch(action) {
    case "L":
      drawLine(x1,y1,x2,y2);
      lines.push([x1,y1,x2,y2]);
      break;
    case "R":
      drawRectangle(x1,y1,x2,y2);
      rectangles.push([x1,y1,x2,y2]);
      break;
    default:
    console.log("Please enter an action!");
  }

  event.preventDefault();

});

// fill the canvas with color
$( "#canvasFillForm" ).submit(function( event ) {

  let fillAction = $( "#fillAction" ).val();
  let fill1 = $( "#fill1" ).val();
  let fill2 = $( "#fill2" ).val();
  let color = $( "#color" ).val();
  let action = $( "#action" ).val();

  switch(fillAction) {
    case "B":
      bucketFill(color,fill1,fill2);
      renderObjects(lines,rectangles);
      break;
    default:
    console.log("Please enter an action!");
  }

  event.preventDefault();

});

// set canvas size
const setCanvas = (width,height) => {
  canvas.width = width;
  canvas.height = height;
};

// draw lines
const drawLine = (x1,y1,x2,y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// draw rectangles
const drawRectangle = (x1,y1,x2,y2) => {
  ctx.rect(x1,y1,x2,y2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
}

// bucket fill
const bucketFill = (color,fill1,fill2) => {

  switch (color) {
    case 'red':
      ctx.fillStyle = "red";
      break;
    case 'orange':
      ctx.fillStyle = "orange";
      break;
    case 'green':
      ctx.fillStyle = "green";
      break;
    default:
      ctx.fillStyle = "red";

  }

  ctx.fillRect(fill1, fill1,canvas.width,canvas.height);

}

// render objects
const renderObjects = (lines,rectangles) => {

  for (let i = 0; i < rectangles.length; i++) {
    let params = rectangles[i].map(num => parseInt(num));
    ctx.clearRect(params[0],params[1],params[2],params[3]);
  }

  for (let i = 0; i < lines.length; i++) {
    let params = lines[i].map(num => parseInt(num));
    ctx.beginPath();
    ctx.moveTo(params[0], params[1]);
    ctx.lineTo(params[2], params[3]);
    ctx.stroke();
  }

}
