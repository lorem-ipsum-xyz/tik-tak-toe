const box = document.querySelectorAll('.box');

// Mag dadraw ng 'O' sa box/div
const createO = () => {
  const div = document.createElement('div');
  div.classList.add('circle');
  return div
}

// Mag ddraw ng 'X' sa box/div
const createX = () => {
  const divs = [
    document.createElement('div'),
    document.createElement('div')
  ];
  divs.map(con => con.classList.add('line'))
  divs[0].classList.add('ln1');
  divs[1].classList.add('ln2');
  return divs
}

// Mag dadraw ng patter
const draw_pattern = (type, winner, start) => {
  const line = document.createElement('div');
  line.classList.add('draw-line');
  
  // draw Horizontal line
  if(type === 'horizontal'){
    line.style.width = '90%';
    line.style.transform = 'rotate(0deg)';
    line.style.left = '5%';
    if(start === 'A2'){
      line.style.top = '49%';
    }else if(start === 'A1'){
      line.style.top = '14%';
    }else{
      line.style.top = '83%'
    }
  }
  // draw Vertical line
  else if(type === 'vertical'){
    line.style.width = '90%';
    line.style.transform = 'rotate(90deg)';
    line.style.top = '48%';
    if(start === 'A1'){
      line.style.left = '-29%';
    }else if(start === 'B1'){
      line.style.left = '5%';
    }else{
      line.style.left = '40%';
    }
  }
  // Draw Diagonal line
  else{
    line.style.top = '49%';
    line.style.left = '0%';
    line.style.width = '100%';
    if(start === 'A1'){
      line.style.transform = 'rotate(45deg)';
    }else{
      line.style.transform = 'rotate(135deg)';
    }
  }
  document.querySelector('.text')
    .innerHTML = `
      <h2 class='win'>
        Player <span class="${winner === 'X' ? 'x':'o'}">${winner}</span> Win!
      </h2>`;
  const board = document.querySelector('.board');
  board.appendChild(line);
  return
}

// Checheck yung mga pattern kung may nanalo ba or wala
// if may nanalo mag rereturn ng object/data
// then cacall na yung function na mag dadraw ng line
const pattern = (Xx,Yy,Zz, type, start) => {
  let X1 = Xx.className.split(" ").includes("X") ? true:false;
  let X2 = Yy.className.split(" ").includes("X") ? true:false;
  let X3 = Zz.className.split(" ").includes("X") ? true:false;
  
  let O1 = Xx.className.split(" ").includes("O") ? true:false;
  let O2 = Yy.className.split(" ").includes("O") ? true:false;
  let O3 = Zz.className.split(" ").includes("O") ? true:false;
  
  // horizontal patterns
  if(X1 && X2 && X3){
    draw_pattern(type, 'X', start);
    return 'X'
  }else if(O1 && O2 && O3){
    draw_pattern(type, 'O', start);
    return 'O'
  }
}

// Checheck kung may nanalo na
function checkIfHaveWinner(){
  let A1=box[0];
  let B1=box[1];
  let C1=box[2];
  let A2=box[3];
  let B2=box[4];
  let C2=box[5];
  let A3=box[6];
  let B3=box[7];
  let C3=box[8];
  
  // Kapag may nanalo na mag didisabled lahat ng div
  const disableAll = () => {
    for(let dib of box){
      dib.classList.add('disabled');
    }
  }
  
  // Pattern types
  let h = 'horizontal';
  let v = 'vertical';
  let d = 'diagonal';
  
  // Checheck yung pattern kung ano nanalo,
  // then tatawgin yung disableAll
  // tapos mag dadraw ng line, based sa pattern na naka return
  //
  // HORIZONTAL
  if(pattern(A1,B1,C1, h, 'A1')){
    disableAll()
  }else if(pattern(A2,B2,C2, h, 'A2')){
    disableAll()
  }else if(pattern(A3,B3,C3, h, 'A3')){
    disableAll()
  }
  // VERTICAL
  else if(pattern(A1,A2,A3, v, 'A1')){
    disableAll()
  }else if(pattern(B1,B2,B3, v, 'B1')){
    disableAll()
  }else if(pattern(C1,C2,C3, v, 'C1')){
    disableAll()
  }
  // DIAGONAL
  else if(pattern(A1,B2,C3, d, 'A1')){
    disableAll()
  }else if(pattern(A3,B2,C1, d, 'C1')){
    disableAll()
  }
}


// checheck kung available ba yung box/div na pinindot
// kung disabled ba siya or may naka lagay na (X/O)
function is_available(div){
  let classes = div.className.split(" ");
  
  // mag rereturn ng false (not available) kapag
  // may X,O or disabled class nang nakalagay
  if(classes.includes('X') || classes.includes("O") || classes.includes('disabled')){
    return false
  }
  
  // return true if available
  return true
}

let turn = Math.random()>0.50?'X':'O';
document.querySelector('.dark')
  .innerHTML = `Player <span class="${turn==='X'?'x':'o'}">${turn}</span> turn.`


// Kapag may pinindot yung user sa box/div
box.forEach((item,_) => {
  item.onclick = () => {
    console.log('Del')
    let dick = is_available(item)
    if(turn === 'X' && dick){
      createX().forEach(col => item.appendChild(col))
      turn = 'O';
      document.querySelector('.text').innerHTML = `<h2 class='dark'>Player <span class="o">O</span> turn.</h2>`;
      item.classList.add('X');
      checkIfHaveWinner();
    }else if(turn === 'O' && dick){
      item.appendChild(createO())
      turn = 'X';
      document.querySelector('.text').innerHTML = `<h2 class='dark'>Player <span class="x">X</span> turn.</h2>`;
      item.classList.add('O')
      checkIfHaveWinner();
    }
  }
})

// Restart button
document.getElementById('restart').addEventListener('click', () => {
  window.location.reload()
})