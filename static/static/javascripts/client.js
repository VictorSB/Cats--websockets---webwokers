var socket;

//connect socket
function connectSocket(){
	socket = null;
	try{
		socket = io.connect('http://localhost');
	
		socket.on('connect', function(){
			log("Socket connected!")
		});
	
		socket.on('disconnect', function(){
			log("Socket disconnected!")
		});
	
		socket.on('echo', function(data){
			log(data.message);
		});
		
		socket.on('deliverData', function(data){
			log("problem:" +data.problem);
			log("solver :" +data.solver);
		});

	} catch(err){
		log(err);
	} 
}

//trying the echo
function echo(data){
	socket.emit('echo',{message:data});
}

//request data to the server
function requestData(){
	socket.emit('requestData',{client:'some data useful for the server goes here'});
}

function launchWorker(datastring,destination){
	var sudokuWorker = new Worker('http://localhost/static/static/javascripts/sudoku.js');
	sudokuWorker.postMessage({type:'sudoku',sudoku:datastring,destination:destination});
	
	sudokuWorker.addEventListener('message',function(e){
		var solved = new Sudoku();
		solved.board = e.data.sudoku.board;
		solved.drawSudoku(e.data.destination);
	},false);
}

function launchProcessWorker(datastring,destination){
	var sudokuWorker = new Worker('http://localhost/static/static/javascripts/sudoku_process.js');
	sudokuWorker.postMessage({type:'sudoku',sudoku:datastring,destination:destination});
	
	sudokuWorker.addEventListener('message',function(e){
		var solved = new Sudoku();
		solved.board = e.data.sudoku.board;
		solved.drawSudoku(e.data.destination);
	},false);
}

//disconnect socket
function disconnectSocket(){
	socket.disconnect();
}

//Logging utils
function log(m){
	console.log(m);
	$('.fakeconsole').append(">> "+m+"\n");
}


