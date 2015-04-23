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
	var guess, word;

	$('.letter').on('keyup', function(event){
		guess = $(this).val().toLowerCase();
		answer = $(this).attr('data-letter');
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
	if (this.clues[direction][clueID]){
		this.clues[direction][clueID].points++;
		
		if (this.clues[direction][clueID].points == this.clues[direction][clueID].spaces.length) {
			this.clues.correct++;
			$('[data-'+direction+'='+clueID+']').addClass('correct');
			if (this.clues.correct === this.clues.total) {
			}
		}
	}	
};


$(function(){
	crossword.play();
});