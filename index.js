var app = angular.module('app', ['angular.filter']);

app.controller('appCtrl', function($scope, $filter){

	orderBy = $filter('orderBy');
	// $scope.chunkBy = $filter('chunkBy')

	var halfCardArray = [
		"c10.jpg",
		"cace.jpg",
		"cjack.jpg",
		"cking.jpg",
		"cqueen.jpg",
		"d10.jpg",
		"dace.jpg",
		"djack.jpg",
		"dking.jpg",
		"dqueen.jpg",
		"h10.jpg",
		"hace.jpg",
		"hjack.jpg",
		"hking.jpg",
		"hqueen.jpg",
		"sjack.jpg",
		"s10.jpg",
		"sace.jpg"
	];

	var allCardArray = halfCardArray.concat(halfCardArray);

	$scope.hide = false;
	
	var flipped = [] 

	$scope.flip = function(card){
		
		// do nothing if the card has already been matched.
		if (card.matched) return;
		
		// prevent the same card from being flipped over twice
		if (flipped.length < 2 && card.hide){
			
			// add the card to the list of flipped cards.
			flipped.push(card)
			card.hide = !card.hide;

			// if second card flipped, check to see if there is a match and pop an alert 
			// message if there are no unmatched cards.
			if (flipped.length == 2){
				
				// flip over the cards permanently if they match.
				if (flipped[0].image == flipped[1].image){
					for (i in flipped){
						flipped[i].matched = true;
					}

					// empty flipped.
					flipped = [];
				
					// check for unmatched cards.
					for (i in $scope.deck){
						if (!$scope.deck[i].matched){
							return;
						}
					}

					// if no unmatched cards left alert victory
					setTimeout(function(){alert("Victory!")}, 1)
				}	
			}
		} else {
			// hide the two flipped over cards
			for (i in flipped){
				flipped[i].hide = true;
			}
			// empty the list of flipped cards.
			flipped = [];
		}
	};

	function Card(image){
		this.image = image;
		this.hide = true;
		this.matched = false;
		this.timeout = 0;
	}

	$scope.randomOrder = function(a){
		return -0.5 + Math.random();
	};


	function createDeck(){
		deck = [];
		for(i in allCardArray){
			var newCard = new Card(allCardArray[i]);

			deck[i] = newCard;
		}
		return orderBy(deck, $scope.randomOrder, true);
	}
	$scope.restart = function(){
		$scope.deck = createDeck();	
	}
	$scope.restart();
});