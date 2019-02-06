var snakeDirection = 'prawo';
var keyaction = 1;

document.addEventListener('keydown',function(event){
    console.log(keyaction);
    if(event.keyCode == 40&& keyaction < 2){
        if(snakeDirection != 'lewo' ) {
            snakeDirection = 'prawo';}
    }
    else if(event.keyCode == 38&& keyaction < 2){
        if(snakeDirection != 'prawo') {
            snakeDirection = 'lewo';}
    }
    else if(event.keyCode == 39&& keyaction < 2){
        if(snakeDirection != 'gora') {
            snakeDirection = 'dol';}
    }
    else if(event.keyCode == 37&& keyaction < 2){
        if(snakeDirection != 'dol') {
            snakeDirection = 'gora';}
    }
    else if(event.keyCode == 32){
        location.reload();
    }
    if(keyaction > 1){}
    else{ keyaction++; }
});

function loop() {
    this.c = document.getElementById("myCanvas");
    this.ctx = this.c.getContext("2d");
    var rand = randPrize();
    var speed = 100;
    var kolizja = false;
    var dlugosc = 1;
    var xPos=1;
    var yPos=1;

    var tab = [0,0];
    for (var i = 1; i < dlugosc; i++){
        tab[i] = [-10,-10];
        console.log(tab);
    }

    if(kolizja == true){
        location.reload();
    }
    setInterval(function(){
        keyaction = 1;
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);

        //inkrementuj wybrany kierunek
        if (snakeDirection == 'dol'){
            xPos++;
        } else if (snakeDirection == 'gora'){
            xPos--;
        } else if (snakeDirection == 'prawo'){
            yPos++;
        } else if (snakeDirection == 'lewo'){
            yPos--;
        }

        //sprawdzam czy trafil nagrode
        if(xPos == rand[0] && yPos == rand[1]) {
            dlugosc++;
            speed--; //zwieksza predkosc za kazdym punktem
            rand = randPrize();
            //sprawdzam czy nowa nagroda nie generuje sie na graczu
            for(var i = 0; i < dlugosc-1; i++)
            {
                if (tab[i][0] == rand[0] && tab[i][1] == rand[1]) {
                    rand = randPrize();
                }
            }
        }

        //dodaje ogon
        for (var i = dlugosc-1; i>0;i--){
            tab[i] = tab[i-1];
            //console.log(tab);

        }
        tab[0] = [xPos,yPos];

        //KOLIZJE

        //sprawdzam czy gracz jest w obszarze
        if(xPos<0 || xPos > (this.c.width/20)-1 || yPos<0 || yPos > (this.c.height/20)-1){
            kolizja = true;
        }

        //przenikanie przez sciany
        if(xPos<0){xPos=(c.width/20)-1;}
        else if(xPos>(c.width/20)-1){ xPos=0;}
        else if(yPos<0){yPos=(c.height/20)-1}
        else if(yPos>(c.height/20)-1){yPos=0;}

        //sprawdzam czy kolizja
        for (var i = 1; i<dlugosc;i++){
            if(tab[0][0] == tab[i][0] && tab[0][1] == tab[i][1]){
            //console.log('zderzenie');
                kolizja = true;
            }
        }

        //jesli wykryje kolizje to przerwij
        if (kolizja == true){
            this.ctx.font = "30px Arial";
            this.ctx.fillText('Wynik: ' + (dlugosc-1),10,50);
            this.ctx.fillText('Nacisnij spacje',10,100);
            return 0;
        }

        this.ctx.beginPath();
        //rysuje ogon
        for (var i=0;i<dlugosc;i++){
            if(i==0){this.ctx.arc((tab[i][0]*20)+10, (tab[i][1] * 20)+10, 10, 0, 2 * Math.PI);}
            this.ctx.rect( tab[i][0]* 20, tab[i][1] * 20, 20, 20);
        }

        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        drawPrice(rand[0],rand[1]);
        this.ctx.font = "20px Arial";
        this.ctx.fillText((dlugosc-1),10,30);
    },speed)
}

function randPrize(){
    var xPrize = Math.floor((Math.random() * (this.c.width/20)-1) + 1);
    var yPrize = Math.floor((Math.random() * (this.c.height/20)-1) + 1);
    return [xPrize, yPrize];
}

function drawPrice(x,y){
    this.ctx.beginPath();
    this.ctx.arc(x*20+10, y*20+10, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
}