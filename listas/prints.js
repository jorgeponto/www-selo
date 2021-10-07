// set its dimension to target size
canvas.width = 960;
canvas.height = 540;

if(image.width > 960 || image.height > 540){
    
    if(image.width >  image.height ){ //comprimento maior que altura
        var ratio = image.height / image.width;
        canvas.width = 960;
        canvas.height = canvas.width * ratio;
    }
    else if(image.height  > image.width ){ //altura maior que comprimento
        var ratio = image.width / image.height;
        canvas.height = 540;
        canvas.width = canvas.height * ratio;
    }
}

// draw source image into the off-screen canvas:
ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

var newBase64 = canvas.toDataURL('image/jpeg', 0.5);
