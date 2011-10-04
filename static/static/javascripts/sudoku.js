self.addEventListener('message', function(e){
	var eventdata = e.data;
	switch(eventdata.type){
		case 'sudoku':
			importScripts("http://localhost/static/static/javascripts/sudoku_basic.js");
			var s = new Sudoku(eventdata.sudoku);
			s.backtrack(0,0);
			self.postMessage({sudoku:s,destination:eventdata.destination});
		break;	
	}; 	
},false);