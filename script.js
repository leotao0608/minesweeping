function set_mode(diff){//difficulty
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
    create_board(board);
}
function create_board(board){
    let board_container=document.getElementById("game_board");
    board_container.innerHTML="";
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            let cell=document.createElement("div");
            cell.classList.add("board_cell");
            cell.addEventListener("click",function(){click_cell(i, j, board);});
            board_container.appendChild(cell);
        }
    }
}
function click_cell(x, y, board){

}