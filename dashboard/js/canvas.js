(function(){
    
var canvas = new fabric.Canvas('canvas');

function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    console.log('hello ji');
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('.stock-images img.img_dragging');
    if(img.classList.contains('bg')){
        addImage(img.src)
    }else{
        var newImage = new fabric.Image(img, {
            width: img.width*2,
            height: img.height*2,
            // Set the center of the new object based on the event coordinates relative
            // to the canvas container.
            left: e.layerX-(img.width*2/2),
            top: e.layerY-(img.height*2/2)
        });
        canvas.add(newImage);
    }
    

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('.stock-images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    // Bind the event listeners for the canvas
    var canvasContainer = document.querySelector('.canvas-section');
    console.log(canvasContainer);
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
    // Replace with a fallback to a library solution.
    alert("This browser doesn't support the HTML5 Drag and Drop API.");
}
addImage('media/img/a.png');
function addImage(url){
    canvas.getObjects().forEach(function(o){
        if(o.id=="background_img"){
            canvas.remove(o);
        }
    });
    console.log(canvas.getObjects().length)
    fabric.Image.fromURL(url, function(myImg) {
     var final_width =myImg.width;
     var final_height = myImg.height;
     var imageRatio = myImg.width/myImg.height;
     if(myImg.width>window.fullwidth){
         //final_width = max_w_pos
      final_height = final_width/ imageRatio;
      
     }else{
     
     }
     final_width = canvas.width;
     final_height = final_width/ imageRatio;
     var myImg = myImg.set({ id:"background_img",left: 0, top: 0 ,width:final_width,height:final_height,selectable: false});
     myImg.hoverCursor = 'default';
     
     canvas.add(myImg); 
     canvas.getObjects().forEach(function(o){
        if(o.id=="background_img"){
            canvas.sendToBack(o);
        }
    });
    });
  }
  document.querySelector('.bg-images').addEventListener('click',function(e){
      if(e.target.classList.contains('bg')){
        addImage(e.target.src);
      }
  });
})();