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
        e.preventDefault(); 
    }
    e.dataTransfer.dropEffect = 'copy'; 

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); 
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }

    var img = document.querySelector('.stock-images img.img_dragging');
    if(img.classList.contains('bg')){
        addImage(img.src);
    }else  if(img.classList.contains('text-article')){
        addText( e.layerX, e.layerY);
    }else{
        var zoom = 5;
        if(img.classList.contains('shape')){
            zoom= 1;
        }
        var newImage = new fabric.Image(img, {
            width: img.width*zoom,
            height: img.height*zoom,
            left: e.layerX-(img.width*2/2),
            top: e.layerY-(img.height*2/2),
            name:img.id,
            borderColor: '#e0dddd',
            cornerColor: '#e0dddd',
            cornerSize: 10,
            transparentCorners: false,
            id:ID()
        });
        canvas.add(newImage);
    }
    updateSidelog()

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
        img.style.cursor = 'grab';
    });
    
}

if (Modernizr.draganddrop) {
    var images = document.querySelectorAll('.stock-images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
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
     console.log(final_width,final_height,'first',imageRatio)
     if(myImg.width>window.fullwidth){
         //final_width = max_w_pos
      final_height = final_width/ imageRatio;
      
     }else{
     
     }
     final_width = canvas.width;
     final_height = final_width/ imageRatio;
     
     var myImg = myImg.set({ id:"background_img",name:"Background Img",left: 0, top: 0 ,width:final_width,height:final_height,selectable: false});
     myImg.hoverCursor = 'default';
     
     canvas.add(myImg); 
     canvas.getObjects().forEach(function(o){
        if(o.id=="background_img"){
            canvas.sendToBack(o);
        }
    });
    canvas.renderAll();
    updateSidelog();
    });
    
  }
  document.querySelector('.bg-images').addEventListener('click',function(e){
      if(e.target.classList.contains('bg')){
        addImage(e.target.src);
      }
  });
  function updateSidelog(){
    var list ="";
    canvas.getObjects().forEach(function(o){
        console.log(o);
        list += "<div class='elements-in-canvas' id='"+o.id+"'>"+o.name+"</div>";
    });
    document.querySelector('.content').innerHTML=list;
    $('.content').sortable({
        axis: 'y',
        containment: 'parent',
        update: function( event, ui ) {
            console.log();
            var sortingArr =$('.content').sortable('toArray');
            sortingArr.forEach(function(e){
                canvas.getObjects().forEach(function(o){  
                    if(o.id==e){
                        canvas.bringForward(o);
                    }
                });
            });
            
            canvas.renderAll();
        }
    });
}

var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };


  //Text
  function addText(x,y){
    var textbox = new fabric.IText('Sample Text', {
        left: x,
        top: y,
        width: 150,
        fontSize: 25,
        fontFamily:"Pacifico",
        name:"Text",
        id:ID(),
        borderColor: '#e0dddd',
        cornerColor: '#e0dddd',
        cornerSize: 10,
        transparentCorners: false,
      });
      canvas.add(textbox).setActiveObject(textbox);
      
      
  }
  

})();

