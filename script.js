var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var kierunek = 'prawo';

var x=1;
var y=1;
var dlugosc = 1;
var rand = randprize();
var kolizja = false;
var speed = 100;
var keyaction = 1;

//var wspolrzedne = {xwsp: 1, ywsp:1};
//var tab = [wspolrzedne];
var tab = [0,0];
for (var i = 1; i<dlugosc; i++){
    tab[i] = [-10,-10];
    //console.log(tab);
}

document.addEventListener('keydown',function(event){
    // console.log(keyaction);
    if(event.keyCode == 40&& keyaction<2){
        if(kierunek != 'lewo' ) {
            kierunek = 'prawo';}
    }
    else if(event.keyCode == 38&& keyaction<2){
        if(kierunek != 'prawo') {
            kierunek = 'lewo';}
    }
    else if(event.keyCode == 39&& keyaction<2){
        if(kierunek != 'gora') {
            kierunek = 'dol';}
    }
    else if(event.keyCode == 37&& keyaction<2){
        if(kierunek != 'dol') {
            kierunek = 'gora';}
        //dlugosc++;
    }
    else if(event.keyCode == 32){
        location.reload();
    }
    if(keyaction>1){}
    else{keyaction++;}
});


function loop() {
    if(kolizja==true){
        location.reload();
    }

    // for (;;){
    setInterval(function(){

        keyaction = 1;
        ctx.clearRect(0, 0, c.width, c.height);

        //inkrementuj wybrany kierunek
        if (kierunek == 'dol'){
            x++;
        }
        else if (kierunek == 'gora'){
            x--;
        }
        else if (kierunek == 'prawo'){
            y++;
        }
        else if (kierunek == 'lewo'){
            y--;
        }

        //sprawdzam czy trafil nagrode
        if(x==rand[0] && y==rand[1]) {

            dlugosc++;
            speed--; //zwieksza predkosc za kazdym punktem
            rand = randprize();

            //sprawdzam czy nowa nagroda nie generuje sie na graczu
            for(var i=0;i<dlugosc-1;i++)
            {
                if (tab[i][0] == rand[0] && tab[i][1] == rand[1]) {
                    //console.log('bylemtu');
                    rand = randprize();
                }
            }
        }

        //dodaje ogon
        for (var i = dlugosc-1; i>0;i--){
            tab[i] = tab[i-1];
            //console.log(tab);

        }
        tab[0] = [x,y];

        //KOLIZJE

        //sprawdzam czy gracz jest w obszarze
        if(x<0 || x>(c.width/20)-1 || y<0 || y>(c.height/20)-1){
            kolizja = true;
        }

        //przenikanie przez sciany
        if(x<0){x=(c.width/20)-1;}
        else if(x>(c.width/20)-1){ x=0;}
        else if(y<0){y=(c.height/20)-1}
        else if(y>(c.height/20)-1){y=0;}

        //sprawdzam czy kolizja
        for (var i = 1; i<dlugosc;i++){
            if(tab[0][0]==tab[i][0] && tab[0][1]==tab[i][1]){
            //console.log('zderzenie');
                kolizja = true;
            }
        }

        //jesli wykryje kolizje to przerwij
        if (kolizja==true){
            //document.getElementById("dupa").innerHTML = 'Przegrałeś! Wynik: ' + (dlugosc-1);
            //document.getElementById("guzik").innerHTML = 'RESTART';
            ctx.font = "30px Arial";
            ctx.fillText('Wynik: ' + (dlugosc-1),10,50);
            ctx.fillText('Nacisnij spacje',10,100);
            return 0;
        }

        ctx.beginPath();
        //rysuje ogon
        for (var i=0;i<dlugosc;i++){
            if(i==0){ctx.arc((tab[i][0]*20)+10, (tab[i][1] * 20)+10, 10, 0, 2 * Math.PI);}
                ctx.rect( tab[i][0]* 20, tab[i][1] * 20, 20, 20);
        }

        ctx.strokeStyle = "black";
        ctx.stroke();
        drawprice(rand[0],rand[1]);
        ctx.font = "20px Arial";
        ctx.fillText((dlugosc-1),10,30);
    },speed)
}

function randprize(){
    var xprize = Math.floor((Math.random() * (c.width/20)-1) + 1);
    var yprize = Math.floor((Math.random() * (c.height/20)-1) + 1);
    return [xprize, yprize];
}

function drawprice(x,y){
    ctx.beginPath();
    //ctx.fillRect(x*20, y*20, 20, 20);
    ctx.arc(x*20+10, y*20+10, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}