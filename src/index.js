const { fabric } = require("fabric");

function add() {
  const red = new fabric.Rect({
    top: 100,
    left: 0,
    width: 80,
    height: 50,
    fill: "red"
  });
  canvas.add(red);
}

const $ = function(id) {
  return document.getElementById(id);
};

const canvas = (window.canvas = new fabric.Canvas("c"));
canvas.setDimensions({ width: 800, height: 800 });

fabric.Object.prototype.transparentCorners = false;

$("addmore").onclick = add;

$("multiselect").onclick = function() {
  canvas.discardActiveObject();
  var sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};

$("group").onclick = function() {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== "activeSelection") {
    return;
  }
  canvas.getActiveObject().toGroup();
  canvas.requestRenderAll();
};

$("ungroup").onclick = function() {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== "group") {
    return;
  }
  canvas.getActiveObject().toActiveSelection();
  canvas.requestRenderAll();
};

$("discard").onclick = function() {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

document.body.appendChild(canvas.wrapperEl);
