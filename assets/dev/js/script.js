var crossword = {};

crossword.init = function(){
	this.clues = {
		across: {},
		down: {}
	};
	this.getInfo("across");
	this.getInfo("down");
};

crossword.getInfo = function(direction){
	var olType = '.' + direction;
	var clues = $(olType).find('li');
	var numAcross = clues.length;

	for (var i=1; i <= numAcross; i++){
		var clue = (direction==="across" ? "Ac" : "Dn") + i;
		this.clues[direction][clue] = {
			answer: "",
			spaces: {},
		};
		var el = '.' + clue;
		if (i === 1){
			this.clues[direction][clue].answer = $(el).attr("data-"+direction+"-answer");
		};
		this.clues[direction][clue].spaces = $(el);
	};
};

crossword.getEntries = function(){

};

$(function(){
	
	crossword.init();

});