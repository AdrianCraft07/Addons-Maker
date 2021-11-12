function pokemon(Pvida, Pataque){
  this.vida = Pvida
  this.ataque = Pataque
}

let pikachu = new pokemon(100, 55)
let jigglypuff = new pokemon(100, 45)
var turno = 1

while(pikachu.vida > 0 && jigglypuff.vida > 0){
  if(turno == 1){
    jigglypuff.vida = jigglypuff.vida - pikachu.ataque
    turno = 0
  }
  else{
    pikachu.vida = pikachu.vida - jigglypuff.ataque
    turno = 1
  }
  console.log('Pikachu', pikachu.vida, 'Jigglypuff', jigglypuff.vida)
}
if(pikachu.vida <= 0) console.log('jigglypuff gano')
  else console.log('pikachu gano')