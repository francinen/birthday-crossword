var crossword = {};

crossword.play = function(){
	this.init();
	this.getInfo("across");
	this.getInfo("down");
	this.evalEntries();
};

crossword.init = function(){
	this.clues = {
		total: 0,
		correct: 0,
		across: {},
		down: {}
	};
	var totalClues = $('.clues').find('li');
	this.clues.total = totalClues.length;
};

crossword.getInfo = function(direction){
	var olType = '.' + direction;
	var clues = $(olType).find('li');

	for (var i=1; i <= clues.length; i++){
		this.clues[direction][i] = {
			points: 0,
			spaces: {},
		};
		this.clues[direction][i].spaces = $('[data-'+direction+'='+i+']');
	};
};

crossword.evalEntries = function(){
	var guess, answer;
	var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	$('.letter').on('keyup', function(event){
		guess = $(this).val().toLowerCase();
		answer = letters[$(this).attr('data-letter')];

		if(event.keyCode >= 65 && event.keyCode <= 90){
			if (guess === answer) {

				var numAc = $(this).attr('data-across');
				var numDn = $(this).attr('data-down');
				if (numAc) {
					crossword.onCorrect('across', numAc);
				}
				if (numDn) {
					crossword.onCorrect('down', numDn);
				}
			}
		}
	});	
	$('.letter').on('keydown', function(event){
		if (event.keyCode == 32){
			return false;
		}
	});
};

crossword.onCorrect = function(direction, clueID){
	var clue = this.clues[direction][clueID];
	if (clue){
		clue.points++;
		if (clue.points == clue.spaces.length && this.noEmpties(clue)) {
			this.clues.correct++;
			$('[data-'+direction+'='+clueID+']').addClass('correct');
			if (this.clues.correct === this.clues.total) {
			}
		}
	}	
};

crossword.noEmpties = function(clue){
	var spaces = clue.spaces;
	var count = 0;
	for (var key = 0; key < clue.spaces.length; key++) {
		var val = $(spaces[key]).val();
		if ( val != "" && val ) {
			count++;
		}
	}
	return count === clue.spaces.length ? true : false; 
};

$(function(){
	crossword.play();
});