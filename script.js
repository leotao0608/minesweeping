let action=-1;   //1 reveal a cell; -1 flag a cell
let display_mine=-1;    //-1 hide; 1 display
let _board=null;
function set_mode(diff){//difficulty
    document.getElementById("custom_inputs").style.display="none";
    document.getElementById("back").style.display="block";
    document.getElementById("hint").style.display="block";
    document.getElementById("winning").style.display="none";
    document.getElementById("flag").style.display="block";

    document.getElementById("button_container").style.display="none";
    if(diff==0){        //easy
        fill_grid(9, 9, 10);
    }else if(diff==1){  //medium
        fill_grid(19, 19, 40);
    }else if(diff==2){              //hard
        fill_grid(19, 30, 99);
    }else{              //custom size
        document.getElementById("hint").style.display="none";
        document.getElementById("flag").style.display="none";
        
        document.getElementById("custom_inputs").style.display="block";
        
    }
}
function set_custom_size() {
    //get input
    const rows = parseInt(document.getElementById("custom_rows").value);
    const cols = parseInt(document.getElementById("custom_cols").value);
    const mines = parseInt(document.getElementById("custom_mines").value);

    // if input is valid
    if (rows >= 2 && cols >= 2 && mines >= 1 && mines <= rows * cols) {
        document.getElementById("custom_inputs").style.display = "none";  
        
        document.getElementById("hint").style.display="block";
        document.getElementById("flag").style.display="block";
        fill_grid(rows, cols, mines); 
        document.getElementById("custom_rows").value = "";
        document.getElementById("custom_cols").value = "";
        document.getElementById("custom_mines").value = "";
    } else {
        alert("Please enter valid values for rows, columns, and mines.");
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
    _board=board;
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
            //quit();
            show_mines(board);
            alert("You died hahaha...");
        }else{
            DFS(x,y,board);
        }
    }
    if(action === 1&&(document.getElementById(`${x}-${y}-cell`).innerHTML === ""||
    document.getElementById(`${x}-${y}-cell`).innerHTML === "🚩")&&
    document.getElementById(`${x}-${y}-cell`).style.backgroundColor!="rgb(192, 192, 192)"){ //Place a flag
        if(document.getElementById(`${x}-${y}-cell`).innerHTML === "🚩"){
            document.getElementById(`${x}-${y}-cell`).innerHTML = "";
            if(document.getElementById(`${x}-${y}-cell`).style.backgroundColor==="rgb(208, 84, 84)")
            document.getElementById(`${x}-${y}-cell`).style.backgroundColor="rgb(200, 230, 201)";
            
        }else{
            document.getElementById(`${x}-${y}-cell`).innerHTML = "🚩";
        }
       
    }
    check_completion(board);
}
function check_completion(board){
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            const cell = document.getElementById(`${i}-${j}-cell`);
            const isMine = board[i][j] === 1;
            const isFlagged = cell.innerHTML === "🚩";
            const isRevealed = cell.style.backgroundColor === "rgb(192, 192, 192)";
            if (!isMine && !isRevealed) {
                return; 
            }
        }
    }
    document.getElementById("winning").innerHTML = "🎉 You Win!";
    document.getElementById("winning").style.display = "block";
}    

function show_mines(){
    if(!_board){
        return;
    }
    display_mine*=-1;
    if(display_mine===1){
        document.getElementById("hint").style.backgroundColor="rgb(168, 200, 213)";
        document.getElementById("hint").style.border="3px solid black";
        for(let i=0;i<_board.length;i++){
            for(let j=0;j<_board[0].length;j++){
                if(_board[i][j]===1){
                    const cell = document.getElementById(`${i}-${j}-cell`);
                    const img = document.createElement("img");
                    if(cell.innerHTML==="🚩"){
                        continue;
                    }
                    img.src = "images/mine_icon.png";
                    img.style.width = "100%";   
                    img.style.height = "100%";
                    
                    cell.innerHTML="";
                    cell.appendChild(img);
                }else if(document.getElementById(`${i}-${j}-cell`).innerHTML==="🚩"){
                    document.getElementById(`${i}-${j}-cell`).style.backgroundColor="rgb(208, 84, 84)";
                }
            }
        }
    }else{
        document.getElementById("hint").style.backgroundColor="rgb(138, 212, 218)";
        document.getElementById("hint").style.border="2px solid black";
        for(let i=0;i<_board.length;i++){
            for(let j=0;j<_board[0].length;j++){
                if(_board[i][j]===1){
                    const cell = document.getElementById(`${i}-${j}-cell`);
                    if(cell.innerHTML!="🚩"){
                        cell.innerHTML="";
                    }
                }else if(document.getElementById(`${i}-${j}-cell`).innerHTML==="🚩"){
                    document.getElementById(`${i}-${j}-cell`).style.backgroundColor="rgb(200, 230, 201)";
                }
            }
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
    document.getElementById(`${x}-${y}-cell`).style.backgroundColor="rgb(192, 192, 192)";
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
    const cell = document.getElementById(`${x}-${y}-cell`);
    cell.innerHTML = ""; 
    if (count > 0 && count <= 8) {
        const img = document.createElement("img");
        img.src = `images/${count}.png`;
        img.style.width = "100%";   
        img.style.height = "100%";
        cell.appendChild(img);
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
    document.getElementById("hint").style.display="none";
}
