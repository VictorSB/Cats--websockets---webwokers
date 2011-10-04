function Sudoku(string){
	this.board = [[0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0]
	             ];
	
	try{
		var rows = string.split(';');
		for(i=0;i<9;i++){
			for(j=0;j<9;j++){
				this.board[i][j] = rows[i].substring(j,j+1)
			}
		}
	} catch(err){
		//console.log("Not a valid string");
	}
}

Sudoku.prototype.validNumber = function(number,row,column){	
	//Check column
	for(var currentRow=0; currentRow < 9; currentRow++){
		if(this.board[currentRow][column] == number){
			return false;
		}
	}
	
	//Check row
	for(var currentCol=0; currentCol < 9; currentCol++){
		if(this.board[row][currentCol] == number){
			return false;
		}
	}
	
	//Check square region
	var regionRow = parseInt(row/3)*3;
	var regionCol = parseInt(column/3)*3;
	for(var i=regionRow;i<regionRow+3;i++){
		for(var j=regionCol;j<regionCol+3;j++){
			if(this.board[i][j]==number){
				return false;
			}
		}
	}
	
	return true;
}

Sudoku.prototype.candidatesFor = function(row,column){
	var candidates = [false,true,true,true,true,true,true,true,true,true];
	for(i=1;i<10;i++){
		candidates[i] = this.validNumber(i,row,column);
	}
	return candidates;
}

Sudoku.prototype.nextEmpty = function(row,col){
	var square = [row,col];
	while(this.board[row][col]!="X"){
		if(col==8){
			col = 0;
			row++;
			if(row > 8){
				return [-1,-1];
			}
		} else{
			col++;
		}
		square[0]=row;
		square[1]=col;
	}
	return square;
}

Sudoku.prototype.backtrack = function(row,col){
	var nextempty  = this.nextEmpty(row,col);
	var currentRow = nextempty[0];
	var currentCol = nextempty[1];
	
	if(currentRow==-1 && currentCol==-1){
		return true;
	}
	
	var candidates = this.candidatesFor(currentRow,currentCol);
	
	for(var i=1;i<10;i++){		
		if(candidates[i]){
			this.board[currentRow][currentCol] = i;
			if(this.backtrack(currentRow,currentCol)){
				return true;
			} else{
				this.board[currentRow][currentCol] = "X";
			}
		}
	}
	return false;
}

Sudoku.prototype.drawSudoku = function(canvasid){
	this.canvas = document.getElementById(canvasid);
	this.ctx = this.canvas.getContext('2d');
	this.template = new Image();
	this.template.src = "http://localhost/static/static/images/sudoku_template.png";
	
	var self = this;
	this.template.addEventListener("load", function() {
		self.ctx.font = "bold 30px sans-serif";

		self.ctx.clearRect(0,0,300,300);
		self.ctx.drawImage(self.template,0,0);
		for(i=0;i<9;i++){
			for(j=0;j<9;j++){
				if(self.board[i][j]!="X")
					self.ctx.fillText(self.board[i][j],10+(i*33),28+(j*33));
			}
		}
    }, false);
}

var s = null;

//"XX64XXXXX;XX1XXXXXX;XXX7XXXX9;XXXXXXXX8;9XXX5XX1X;7X813XXXX;5XXXX43XX;XX4XXXX6X;8XXX96XX4" SLOW
//"X5XX4XXXX;X138XXX64;9XX3XX521;4XXXX9XX6;7XX4X398X;18XX264XX;XXX2XXXX9;8X4XXX63X;X9XXXX1X7" FAST

