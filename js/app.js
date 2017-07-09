var canvas = document.getElementById("canvas-container");
var ctx    = canvas.getContext("2d");

const defaultWidth = 200;
const defaultHeight = 200;
var objects = new Array();

$( document ).ready(function() {
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
});

$( "#resetCanvas" ).click(function( event ) {

  objects = [];
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
  event.preventDefault();

});

$( "#canvasPropertiesForm" ).submit(function( event ) {

  let width = $( "#canvasWidth" ).val();
  let height = $( "#canvasHeight" ).val();
  setCanvas(width,height);
  event.preventDefault();

});

$( "#canvasAttributesForm" ).submit(function( event ) {

  let x1 = $( "#x1" ).val();
  let x2 = $( "#x2" ).val();
  let y1 = $( "#y1" ).val();
  let y2 = $( "#y2" ).val();
  let action = $( "#action" ).val();

  switch(action) {
    case "L":
      drawLine(x1,y1,x2,y2);
      break;
    case "R":
      drawRectangle(x1,y1,x2,y2);
      break;
    default:
    console.log("Please enter an action!");
  }

  objects.push([x1,y1,x2,y2]);
  event.preventDefault();

});

$( "#canvasFillForm" ).submit(function( event ) {

  let fillAction = $( "#fillAction" ).val();
  let fill1 = $( "#fill1" ).val();
  let fill2 = $( "#fill2" ).val();
  let color = $( "#color" ).val();
  let action = $( "#action" ).val();

  switch(fillAction) {
    case "B":
      bucketFill(color,fill1,fill2);
      renderObjects(objects);
      break;
    default:
    console.log("Please enter an action!");
  }

  event.preventDefault();

});

const setCanvas = (width,height) => {
  canvas.width = width;
  canvas.height = height;
};

const drawLine = (x1,y1,x2,y2) => {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

const drawRectangle = (x1,y1,x2,y2) => {
  ctx.rect(x1,y1,x2,y2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
}

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

const renderObjects = (obj) => {

  for (let i = 0; i < obj.length; i++) {
    let params = obj[i].map(num => parseInt(num));
    ctx.clearRect(params[0],params[1],params[2],params[3]);
  }

}
