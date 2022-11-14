//Source: https://en.wikipedia.org/wiki/Mandelbrot_set#Escape_time_algorithm

var canvas = document.getElementById("Background");
var ctx = canvas.getContext("2d");

//Runs on window load
var width = 1920;
var height = 1080;

//Sets canvas to size of window
canvas.width = width;
canvas.height = height;

//Allows for pixles to be drawn at specific points - much faster than fillrect()
var imageData = ctx.createImageData(width,height);

//Max iterations per pixle calculation
var maxIterations = 250;

var MandleBulb = [0,0]


//Loops through every pixles and passes into iterate function
function GenerateImage(){
    for(var y = 0; y<height; y++){
        for(var x = 0; x<width; x++){
            iterate(x, y, maxIterations)
        }
    }
}


//Pan and zoom varibles
var Dx = -width / 2;
var Dy = -height / 2;

var panx = -100;
var pany = 0;
var zoom = 150;

// Palette array of 256 colors
//Source: https://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
var palette = [];

// Generate palette for colour use,
//Best combination is to use dark red -> white gradient
function generatePalette() {
    // Calculate a gradient
    var roffset = 24;
    var goffset = 16;
    var boffset = 0;
    for (var i=0; i<256; i++) {
        palette[i] = { r:roffset, g:goffset, b:boffset};

        if (i < 64) {
            roffset += 3;
        } else if (i<128) {
            goffset += 3;
        } else if (i<192) {
            boffset += 3;
        }
    }
}



//Calculates coulour of pixle depnding on escape time algorithm
function iterate(x, y, maxIt = maxIterations){
    //Pan and zoom -> fractacle plane coordinates
    var x_0 = (x + Dx + panx) / zoom;
    var y_0 = (y + Dy + pany) / zoom;

    //Iteration Parameters
    /*
        Complex numbers come in the form of
            z = a + ib
        where:
            a is the real part
            ib is the imaginary part
    */
    //r is radius around origin
    var a = 0;
    var b = 0;
    var rx = 0;
    var ry = 0;

    //Iterating loop begins
    var iterations = 0;

    while(iterations < maxIt && (rx * rx + ry * ry <= 4)){
        rx = a * a - b * b + x_0;
        ry = 2 * a * b + y_0;
 
        // Next iteration
        a = rx;
        b = ry;
        iterations++;
    }

    //Calculates the colour based on how many iterations took place
    //Source: https://stackoverflow.com/questions/1484506/random-color-generator
    var colour;
    if (iterations == maxIt) {
        colour = { r:0, g:0, b:0}; //Black Colour - for when the value seemingly grows to infinity
    } else {
        var index = Math.floor((iterations / (maxIterations-1)) * 255);
        colour = palette[index];
    }

    //Set colour of pixle on canvas
    var pixelindex = (y * width + x)*4;
    imageData.data[pixelindex] = colour.r;
    imageData.data[pixelindex+1] = colour.g;
    imageData.data[pixelindex+2] = colour.b;
    imageData.data[pixelindex+3] = 255;
}

//Pan and Zoom functionality
//Source: https://stackoverflow.com/questions/10626292/determining-mouse-position-on-an-html5-canvas-after-zooming
//Source2: https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function init() {
    //Add mouse events
    canvas.addEventListener("mousedown", onMouseDown);
    
    //Generate palette
    generatePalette();
    
    //Generate image
    GenerateImage();

    //Enter main loop
    main(0);
}

function main() {
    //Request animation frames
    window.requestAnimationFrame(main);
    
    //Draw the generate image
    ctx.putImageData(imageData, 0, 0);
}

function zoomFractal(x, y, factor, zoomin) {
    if (zoomin) {
        // Zoom in
        zoom *= factor;
        panx = factor * (x + Dx + panx);
        pany = factor * (y + Dy + pany);
    } else {
        // Zoom out
        zoom /= factor;
        panx = (x + Dx + panx) / factor;
        pany = (y + Dy + pany) / factor;
    }
}

function onMouseDown(e) {
    var pos = getMousePos(canvas, e);
    
    //Zoom out with Control
    var zoomin = true;
    if (e.ctrlKey) {
        zoomin = false;
    }
    
    //Pan with Shift
    var zoomfactor = 2;
    if (e.shiftKey) {
        zoomfactor = 1;
    }
    
    //Zoom the fractal at the mouse position
    zoomFractal(pos.x, pos.y, zoomfactor, zoomin);
    
    //Generate a new image
    GenerateImage();
}

//Get the mouse position
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
        y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
    };
}



//starts the animation loop
window.onload = function(){
    init();
};
