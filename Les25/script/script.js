var emptySquaresArray = new Array(16);

var totalScore = 0;
//Vier losse arrays, want twee-dimensionaal array werkt niet zoals verwacht.
var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];

$(document).ready(function(){
   $(document).keydown(function(e){                                 //keydown gebruikt omdat keypressed geen pijltjestoetsen ondersteund (testbrowser: firefox)
        arrowKeyPressed(e);
   });
   $(document).on('swiperight', function(){
        window.alert("test swipe");
   });
   $('#btRestart').click(function()
   {
        start();
   });

  for (let y = 0; y < 4; y++) {
    $('#container').append("<div class =\"row\" id=\"row"+y+"\">");
        for (let x = 0; x < 4; x++) {
            //myArray[x, y] = -1;
            
            $('#row'+y).append("<div class = \"col\"><p id=\""+x+ "a"+ y + "\"> 0 </p></div>");   
            
        }
        $('#container').append("</div>");
    }
    start();
    updateUI();

})


function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomEmptySquare(){
   var random = randomIntFromInterval(0, emptySquaresArray.length-1);
   return emptySquaresArray[random];
}

function updateEmptySquaresArray(){
    emptySquaresArray = new Array();
    
        for (let y = 0; y < 4; y++) {
            
            const element1 = array1[y];
            const element2 = array2[y];
            const element3 = array3[y];
            const element4 = array4[y];
            if(element1 == -1){
                var index =  y;
                emptySquaresArray.push(index);
            }
            if(element2 == -1){
                var index = 10 + y;
                emptySquaresArray.push(index);
            }
            if(element3 == -1){
                var index = 20 + y;
                emptySquaresArray.push(index);
            }
            if(element4 == -1){
                var index = 30 + y;
                emptySquaresArray.push(index);
            }
        }
}

//initialiseren/resetten van het spel
function start() {
    
        for (let y = 0; y < 4; y++) {
            
            array1[y] = -1;
            array2[y] = -1;
            array3[y] = -1;
            array4[y] = -1;
        }

    updateEmptySquaresArray();
    fillRandomEmptySquare();

    updateEmptySquaresArray();
    fillRandomEmptySquare();

    updateUI();
}

function fillRandomEmptySquare(){
    var r1 = getRandomEmptySquare();
    var rValue = randomIntFromInterval(1,4);
    if(rValue !=4){
        rValue = 2;
    }

    if(r1 >= 30){
       y=r1-30;
       array4[y] = rValue;
    }
    else if(r1 >= 20){
        y=r1-20;
        array3[y] = rValue;
    }
    else if(r1 >= 10){
        y = r1-10;
        array2[y] = rValue;
    }
    else{
        y = r1;
        array1[y] = rValue;
    }
}

function updateUI(){
    for (let index = 0; index <4; index++) {
        var value= array1[index];
        if(value != -1){
           $('#0a'+index).text(value);
           var pId = '#0a' + index;
           changeBackground(pId, value);
        }
        else{
            $('#0a'+index).text('.');
            var pId = '#0a' + index;
           changeBackground(pId, value);
            
        }
            var value= array2[index];
        if(value != -1){
           $('#1a'+index).text(value);
           var pId = '#1a' + index;
           changeBackground(pId, value);
        }
        else{
            $('#1a'+index).text('.');
            var pId = '#1a' + index;
           changeBackground(pId, value);
        }
            var value= array3[index];
        if(value != -1){
           $('#2a'+index).text(value);
           var pId = '#2a' + index;
           changeBackground(pId, value);
        }
        else{
            $('#2a'+index).text('.');
            var pId = '#2a' + index;
           changeBackground(pId, value);
        }
            var value= array4[index];
        if(value != -1){
           $('#3a'+index).text(value);
           var pId = '#3a' + index;
           changeBackground(pId, value);
        }
        else{
            $('#3a'+index).text('.');
            var pId = '#3a' + index;
           changeBackground(pId, value);
        }
    }
    $('#score').text('Score: ' + totalScore);
    
    checkWinLoss();
}

function changeBackground(background, value){
    switch(value)
    {
        case 2:
            $(background).parent().css("background-color", "white");
            $(background).css("visibility", "visible");
            break;
        case 4:
            $(background).parent().css("background-color", "antiquewhite");
            $(background).css("visibility", "visible");
            break;
        case 8:
            $(background).parent().css("background-color", "yellow");
            $(background).css("visibility", "visible");
            break;
        case 16:
            $(background).parent().css("background-color", "yellowgreen");
            $(background).css("visibility", "visible");
            break;
        case 32:
            $(background).parent().css("background-color", "chartreuse");
            $(background).css("visibility", "visible");
            break;
        case 64:
            $(background).parent().css("background-color", "green");
            $(background).css("visibility", "visible");
            break;
        case 128:
            $(background).parent().css("background-color", "orange");
            $(background).css("visibility", "visible");
            break;
        case 256:
            $(background).parent().css("background-color", "darkorange");
            $(background).css("visibility", "visible");
            break;
        case 512:
            $(background).parent().css("background-color", "chocolate");
            $(background).css("visibility", "visible");
            break;
        case 1024:
            $(background).parent().css("background-color", "red");
            $(background).css("visibility", "visible");
            break;
        case 2048:
            $(background).parent().css("background-color", "brown");
            $(background).css("visibility", "visible");
            break;
        default:
            $(background).parent().css("background-color", "Gray");
            $(background).css("visibility", "hidden");
    }
}

function addScore(score){
    totalScore = totalScore + score;
}


//controleer of de speler heeft gewonnen/verloren.
function checkWinLoss(){
    //check win
    for (let index = 0; index < array1.length; index++) {
        
        if(array1[index] == 2048 || array2[index] == 2048|| array3[index] == 2048|| array4[index] == 2048)
        {
            sleep(500).then(() => {
            window.alert("Gefeliciteerd! U heeft gewonnen.");
        });
            return; // eindig methode
        }
    }
    //check loss
        if(jQuery.inArray(-1, array1) == -1 && jQuery.inArray(-1, array2) == -1 && jQuery.inArray(-1, array3) == -1 && jQuery.inArray(-1, array4) == -1)
        {
            // controleer of 2 hokjes naast elkaar zelfde waarde hebben
            if(    array1[0] != array1[1] && array1[1] != array1[2] && array1[2] != array1[3]
                && array2[0] != array2[1] && array2[1] != array2[2] && array2[2] != array2[3]
                && array3[0] != array3[1] && array3[1] != array3[2] && array3[2] != array3[3]
                && array4[0] != array4[1] && array4[1] != array4[2] && array4[2] != array4[3]

                && array1[0] != array2[0] && array2[0] != array3[0] && array3[0] != array4[0]
                && array1[1] != array2[1] && array2[1] != array3[1] && array3[1] != array4[1]
                && array1[2] != array2[2] && array2[2] != array3[2] && array3[2] != array4[2]
                && array1[3] != array2[3] && array2[3] != array3[3] && array3[3] != array4[3]
                )
                sleep(500).then(() => {
                    window.alert("Helaas, er zijn geen zetten meer mogelijk.");
                });
        }
        
    


}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//testfunctie, print volledig grid in console
function debug2(){
    for (let index = 0; index < 4; index++) {
       console.log("0, "+ index + ": "+ array1[index]);
       console.log("1, "+ index + ": "+ array2[index]);
       console.log("2, "+ index + ": "+ array3[index]);
       console.log("3, "+ index + ": "+ array4[index]);
    }
}


function arrowKeyPressed(event){
    var code = event.which;
    console.log("eventcode: " + code);
    if(code == 119 || code == 87 || code == 38)      //38=up arrow   119 = W 87 = w
    {
        console.log("Arrow Up pressed");
        var changed1 = moveUp(array1);
        var changed2 = moveUp(array2);
        var changed3 = moveUp(array3);
        var changed4 = moveUp(array4);
        //move all up
        //if moved random new square

        if(changed1 || changed2 || changed3 || changed4){
            
            updateEmptySquaresArray();
            fillRandomEmptySquare();
            updateUI();
        }
    }
    if(code == 115 || code == 83 || code == 40) //40= down arrow | 115 = S 83 = s
    {
        var changed1 = moveDown(array1);
        var changed2 = moveDown(array2);
        var changed3 = moveDown(array3);
        var changed4 = moveDown(array4);
        if(changed1 || changed2 || changed3 || changed4){
            
            updateEmptySquaresArray();
            fillRandomEmptySquare();
            updateUI();
        }
//move all down
//if 2 same, merge
        //if moved random new square
    }
    if(code == 97 || code == 65 || code == 37) //37 = left arrow  // 97 = A 65 = a
    {
        var changed = moveLeft();
        if(changed){
            updateEmptySquaresArray();
            fillRandomEmptySquare();
            updateUI();
        }
        //if moved random new square
    }
    if(code == 100 || code == 68 || code == 39) //39= right arrow   // 100 = D 68 = d
    {
        var changed = moveRight();
        if(changed){
            updateEmptySquaresArray();
            fillRandomEmptySquare();
            updateUI();
        }
    }
}


function moveUp(upArray){ 
    var changed = false;
    if(upArray[1] != -1 || upArray[2] != -1 || upArray[3] !=-1){    //alleen als hokje 1, 2 of 3 gevuld zijn
            if(upArray[0] != -1){                   //controleer of hokje 0 gevuld is
                if(upArray[1] != -1){               //controleer of hokje 1 gevuld is
                    if(upArray[1] == upArray[0]){   //controleer of hokje 0 en 1 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        upArray[0] = upArray[0] *2;
                        addScore(upArray[0]);
                        upArray[1] = -1;
                        changed = true;
                    }
                }
                else if(upArray[2] != -1){          
                    if(upArray[2] == upArray[0]){   //controleer of hokje 0 en 2 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        upArray[0] = upArray[0] *2;
                        addScore(upArray[0]);
                        upArray[2] = -1;
                        changed = true;
                    }
                }
                else if(upArray[3] != -1){          
                    if(upArray[3] == upArray[0]){   //controleer of hokje 0 en 3 gelijk zijn 
                        upArray[0] = upArray[0] *2;
                        addScore(upArray[0]);
                        upArray[3] = -1;
                        changed = true;
                    }
                }
            }
            if(upArray[1] != -1){                       
                if(upArray[2] != -1){           
                    if(upArray[2] == upArray[1]){   //controleer of hokje 1 en 2 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        upArray[1] = upArray[1] *2;
                        addScore(upArray[1]);
                        upArray[2] = -1;
                        changed = true;
                    }
                }
                else if(upArray[3] != -1){
                    if(upArray[3] == upArray[1]){   //controleer of hokje 1 en 3 gelijk zijn
                        upArray[1] = upArray[1] *2;
                        addScore(upArray[1]);
                        upArray[3] = -1;
                        changed = true;
                    }
                }
            }
            if(upArray[2] != -1){
                if(upArray[3] != -1){               //controleer of hokje 2 en 3 gelijk zijn
                    if(upArray[3] == upArray[2]){
                        upArray[2] = upArray[2] *2;
                        addScore(upArray[2]);
                        upArray[3] = -1;
                        changed = true;
                    }
                }
            }

            //beweeg alles naar boven
        
            for (let index = 0; index < 3; index++) {   
            if(upArray[2] == -1 &&upArray[3] != -1){
                upArray[2] = upArray[3];
                upArray[3] = -1;
                changed = true;
            }
            if(upArray[1] == -1 && upArray[2] != -1){
                upArray[1] = upArray[2];
                upArray[2] = -1;
                changed = true;
            }
            if(upArray[0] == -1 && upArray[1] != -1){
                upArray[0] = upArray[1];
                upArray[1] = -1;
                changed = true;
            }
            }
    }
    return changed;
}

function moveDown(downArray){
    var changed = false;
    if(downArray[0] != -1 || downArray[1] != -1 || downArray[2] !=-1){    //alleen als hokje 0, 1 of 2 gevuld zijn
            if(downArray[3] != -1){                   //controleer of hokje 3 gevuld is
                if(downArray[2] != -1){               //controleer of hokje 2 gevuld is
                    if(downArray[2] == downArray[3]){   //controleer of hokje 0 en 1 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        downArray[3] = downArray[3] *2;
                        addScore(downArray[3]);
                        downArray[2] = -1;
                        changed = true;
                    }
                }
                else if(downArray[1] != -1){          
                    if(downArray[1] == downArray[3]){   //controleer of hokje 2 en 3 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        downArray[3] = downArray[3] *2;
                        addScore(downArray[3]);
                        downArray[1] = -1;
                        changed = true;
                    }
                }
                else if(downArray[0] != -1){          
                    if(downArray[0] == downArray[3]){   //controleer of hokje 0 en 3 gelijk zijn 
                        downArray[3] = downArray[3] *2;
                        addScore(downArray[3]);
                        downArray[0] = -1;
                        changed = true;
                    }
                }
            }
            if(downArray[2] != -1){                       
                if(downArray[1] != -1){           
                    if(downArray[1] == downArray[2]){   //controleer of hokje 1 en 2 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        downArray[2] = downArray[2] *2;
                        addScore(downArray[2]);
                        downArray[1] = -1;
                        changed = true;
                    }
                }
                else if(downArray[0] != -1){
                    if(downArray[0] == downArray[2]){   //controleer of hokje 0 en 2 gelijk zijn
                        downArray[2] = downArray[2] *2;
                        addScore(downArray[2]);
                        downArray[0] = -1;
                        changed = true;
                    }
                }
            }
            if(downArray[1] != -1){
                if(downArray[0] != -1){               //controleer of hokje 0 en 1 gelijk zijn
                    if(downArray[0] == downArray[1]){
                        downArray[1] = downArray[1] *2;
                        addScore(downArray[1]);
                        downArray[0] = -1;
                        changed = true;
                    }
                }
            }

//beweeg alles naar onder
        for (let index = 0; index < 3; index++) {
            if(downArray[1] == -1 && downArray[0] != -1){
                downArray[1] = downArray[0];
                downArray[0] = -1;
                changed = true;
            }
            if(downArray[2] == -1 && downArray[1] != -1){
                downArray[2] = downArray[1];
                downArray[1] = -1;
                changed = true;
            }
            if(downArray[3] == -1 && downArray[2] != -1){
                downArray[3] = downArray[2];
                downArray[2] = -1;
                changed = true;
            }
        }
    }
    return changed;
}

function moveLeft() {
    var changed = false;
    for (let index = 0; index < 4; index++) {

        if(array2[index] != -1 || array3[index] != -1 || array4[index] !=-1){    //alleen als hokje 0, 1 of 2 gevuld zijn
            if(array1[index] != -1){                   //controleer of array 1 gevuld is
                if(array2[index] != -1){               //controleer of hokje 2 gevuld is
                    if(array1[index] == array2[index]){   //controleer of hokje 0 en 1 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array1[index] = array1[index] *2;
                        addScore(array1[index]);
                        array2[index] = -1;
                        changed = true;
                    }
                }
                else if(array3[index] != -1){          
                    if(array1[index] == array3[index]){   //controleer of hokje 2 en 3 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array1[index] = array1[index] *2;
                        addScore(array1[index]);
                        array3[index] = -1;
                        changed = true;
                    }
                }
                else if(array4[index] != -1){          
                    if(array1[index] == array4[index]){   //controleer of hokje 0 en 3 gelijk zijn 
                        array1[index] = array1[index] *2;
                        addScore(array1[index]);
                        array4[index] = -1;
                        changed = true;
                    }
                }
            }
            if(array2[index] != -1){                       
                if(array3[index] != -1){           
                    if(array2[index] == array3[index]){   //controleer of hokje 1 en 2 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array2[index] = array2[index] *2;
                        addScore(array2[index]);
                        array3[index] = -1;
                        changed = true;
                    }
                }
                else if(array4[index] != -1){
                    if(array2[index] == array4[index]){   //controleer of hokje 0 en 2 gelijk zijn
                        array2[index] = array2[index] *2;
                        addScore(array2[index]);
                        array4[index] = -1;
                        changed = true;
                    }
                }
            }
            if(array3[index] != -1){
                if(array4[index] != -1){               //controleer of hokje 0 en 1 gelijk zijn
                    if(array3[index] == array4[index]){
                        array3[index] = array3[index] *2;
                        addScore(array3[index]);
                        array4[index] = -1;
                        changed = true;
                    }
                }
            }
        }
        //beweeg naar links
        for (let i = 0; i < 3; i++) {
            if(array3[index] == -1 && array4[index] != -1){
                array3[index] = array4[index];
                array4[index] = -1;
                changed = true;
            }
            if(array2[index] == -1 && array3[index] != -1){
                array2[index] = array3[index];
                array3[index] = -1;
                changed = true;
            }
            if(array1[index] == -1 && array2[index] != -1){
                array1[index] = array2[index];
                array2[index] = -1;
                changed = true;
            }
        }

    }
    return changed;
}

function moveRight() {  //TODO: beweegt nog naar links
    var changed = false;
    for (let index = 0; index < 4; index++) {

        if(array1[index] != -1 || array2[index] != -1 || array3[index] !=-1){    //alleen als hokje 0, 1 of 2 gevuld zijn
            if(array4[index] != -1){                   //controleer of array 1 gevuld is
                if(array3[index] != -1){               //controleer of hokje 2 gevuld is
                    if(array4[index] == array3[index]){   //controleer of hokje 0 en 1 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array4[index] = array4[index] *2;
                        addScore(array4[index]);
                        array3[index] = -1;
                        changed = true;
                    }
                }
                else if(array2[index] != -1){          
                    if(array4[index] == array2[index]){   //controleer of hokje 2 en 3 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array4[index] = array4[index] *2;
                        addScore(array4[index]);
                        array2[index] = -1;
                        changed = true;
                    }
                }
                else if(array1[index] != -1){          
                    if(array1[index] == array4[index]){   //controleer of hokje 0 en 3 gelijk zijn 
                        array4[index] = array4[index] *2;
                        addScore(array4[index]);
                        array1[index] = -1;
                        changed = true;
                    }
                }
            }
            if(array3[index] != -1){                       
                if(array2[index] != -1){           
                    if(array3[index] == array2[index]){   //controleer of hokje 1 en 2 gelijk zijn | kan niet worden samengevoegd omdat er een andere waarde in kan staan, dan moet else if niet worden uitgevoerd!
                        array3[index] = array3[index] *2;
                        addScore(array3[index]);
                        array2[index] = -1;
                        changed = true;
                    }
                }
                else if(array1[index] != -1){
                    if(array3[index] == array1[index]){   //controleer of hokje 0 en 2 gelijk zijn
                        array3[index] = array3[index] *2;
                        addScore(array3[index]);
                        array1[index] = -1;
                        changed = true;
                    }
                }
            }
            if(array2[index] != -1){
                if(array1[index] != -1){               //controleer of hokje 0 en 1 gelijk zijn
                    if(array2[index] == array1[index]){
                        array2[index] = array2[index] *2;
                        addScore(array2[index]);
                        array1[index] = -1;
                        changed = true;
                    }
                }
            }
        }
        //beweeg naar links
        for (let i = 0; i < 3; i++) {
            if(array2[index] == -1 && array1[index] != -1){
                array2[index] = array1[index];
                array1[index] = -1;
                changed = true;
            }
            if(array3[index] == -1 && array2[index] != -1){
                array3[index] = array2[index];
                array2[index] = -1;
                changed = true;
            }
            if(array4[index] == -1 && array3[index] != -1){
                array4[index] = array3[index];
                array3[index] = -1;
                changed = true;
            }
        }

    }
    return changed;
}