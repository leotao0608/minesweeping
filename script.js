let action=-1;   //1 reveal a cell; -1 flag a cell
function set_mode(diff){//difficulty
    document.getElementById("back").style.display="block";
    document.getElementById("button_container").style.display="none";
    if(diff==0){        //easy
        fill_grid(9, 9, 10)
    }else if(diff==1){  //medium
        fill_grid(19, 19, 40)
    }else{              //hard
        fill_grid(19, 30, 99)
    }
}
function fill_grid(x, y, mine_num){
    let board = Array(x).fill().map(() => Array(y).fill(0));   //0 no mine; 1 mine
    let n=mine_num;
    while(n>0){
        let X=Math.floor(Math.random()*x);
        let Y=Math.floor(Math.random()*y);
        while(board[X][Y]==1){
            X=Math.floor(Math.random()*x);
            Y=Math.floor(Math.random()*y);
        }
        board[X][Y]=1;
        n--;
    }
    create_board(board,x,y);
}
function create_board(board,x,y){
    let board_container=document.getElementById("game_board");
    board_container.innerHTML="";
    board_container.style.display="block";
    board_container.style.display = "grid";
    board_container.style.gridTemplateColumns = `repeat(${y}, 20px)`;
    board_container.style.gridTemplateRows = `repeat(${x}, 20px)`;
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            let cell=document.createElement("div");
            cell.classList.add("board_cell");
            cell.id=`${i}-${j}-cell`;
            cell.addEventListener("click",function(){click_cell(i, j, board);});
            board_container.appendChild(cell);
        }
    }
}
function click_cell(x, y, board){
    if(action==-1){         //reveal a cell
        if(board[x][y]==1){
            document.getElementById(`${x}-${y}-cell`).innerHTML = "M";
            quit();
            alert("You died hahaha...");
        }else{
            DFS(x,y,board);
        }
    }
    if(action === 1&&(document.getElementById(`${x}-${y}-cell`).innerHTML === ""||
    document.getElementById(`${x}-${y}-cell`).innerHTML === "🚩")){
        if(document.getElementById(`${x}-${y}-cell`).innerHTML === "🚩"){
            document.getElementById(`${x}-${y}-cell`).innerHTML = "";
        }else{
            document.getElementById(`${x}-${y}-cell`).innerHTML = "🚩";
        }
       
    }
    
}
function DFS(x, y, board, visited = null) {
    const rows = board.length;
    const cols = board[0].length;
    if (!visited) {
        visited = Array(rows).fill().map(() => Array(cols).fill(false));
    }

    // Bounds check
    if (x < 0 || x >= rows || y < 0 || y >= cols) return;
    // Already visited
    if (visited[x][y]) return;

    visited[x][y] = true;
    count_mines(x,y,board);
    // Count adjacent mines
    let count = 0;
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (let i = 0; i < 8; i++) {
        let nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && board[nx][ny] === 1) {
            count++;
        }
    }

    // Reveal the current cell
    const cell = document.getElementById(`${x}-${y}-cell`);
    if (cell.innerHTML === "") cell.innerHTML = count === 0 ? "" : count;

    // If no adjacent mines, continue DFS
    if (count === 0) {
        for (let i = 0; i < 8; i++) {
            let nx = x + dx[i], ny = y + dy[i];
            DFS(nx, ny, board, visited);
        }
    }
}

function count_mines(x,y,board){
    document.getElementById(`${x}-${y}-cell`).style.backgroundColor="rgb(168, 203, 205)";
    let count=0;
    const rows = board.length;
    const cols = board[0].length;
    if (x + 1 < rows && y + 1 < cols && board[x + 1][y + 1]) count++;
    if (x + 1 < rows && y - 1 >= 0 && board[x + 1][y - 1]) count++;
    if (x + 1 < rows && board[x + 1][y]) count++;
    if (x - 1 >= 0 && y + 1 < cols && board[x - 1][y + 1]) count++;
    if (x - 1 >= 0 && y - 1 >= 0 && board[x - 1][y - 1]) count++;
    if (x - 1 >= 0 && board[x - 1][y]) count++;
    if (y + 1 < cols && board[x][y + 1]) count++;
    if (y - 1 >= 0 && board[x][y - 1]) count++;
    switch(count){
        case 0:
            document.getElementById(`${x}-${y}-cell`).innerHTML="0";
            document.getElementById(`${x}-${y}-cell`).textContent="";
            break;    
        case 1:
            document.getElementById(`${x}-${y}-cell`).innerHTML="1";
            break;
        case 2:
            document.getElementById(`${x}-${y}-cell`).innerHTML="2";
            break;
        case 3:
            document.getElementById(`${x}-${y}-cell`).innerHTML="3";
            break;
        case 4:
            document.getElementById(`${x}-${y}-cell`).innerHTML="4";
            break;
        case 5:
            document.getElementById(`${x}-${y}-cell`).innerHTML="5";
            break;
        case 6:
            document.getElementById(`${x}-${y}-cell`).innerHTML="6";
            break;
        case 7:
            document.getElementById(`${x}-${y}-cell`).innerHTML="7";
            break;
        case 8:
            document.getElementById(`${x}-${y}-cell`).innerHTML="8";        
            break;            
    }
}
function click_flag(){
    action*=-1;
    if(action===1){
        document.getElementById("flag").style.backgroundColor="rgb(168, 200, 213)";
        document.getElementById("flag").style.border="3px solid black";

    }else{
        document.getElementById("flag").style.backgroundColor="rgb(138, 212, 218)";
        document.getElementById("flag").style.border="2px solid black";
    }
        
}
function quit(){
    document.getElementById("game_board").innerHTML="";
    document.getElementById("game_board").style.display="none";
    document.getElementById("button_container").style.display="block";
    document.getElementById("back").style.display="none";
}
