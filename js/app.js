/**
* @description Represents a Memory Game
* @constructor
* @param {string} title - Memory Game
* @param {string} author - Nikonov Alex - Udacity Course
*/


"use strict";

$(function(){
	const cards = $(".card"),
		stars = $('.stars'),
		restartButton = $('.restart'),
		moves = $('.moves'),
		stopWatchDisplay = $('#stop_watch'),
		gameOver = $('.game-over'),
		deck = $('.deck');
	let icons = [],
		gameStats = ['1', 'hello', 'word', 'this'],
		matchCounter, 
		startTime,
		failNumber,
		movesCounter,
		timer;

	cards.on('click.firstStart', restartGame);
	restartButton.on('click', restartGame);

	function restartGame(){
		cards.off('click.firstStart');
		failNumber = 0;
		movesCounter = 0;
		closeModalWindow();
		cards.removeClass('opened shown matched');
		//TODO ADD RAMDOM CARD OPENING AND CLOSING
		cards.off('click.openFirst');
		cards.off('click.openSecond');
		stopWatch(0);//starts stopWatch
		moves.text(0);//it's not a function just text replacement
		getCardsShuffled();	
		setTimeout(openAllCards,1000);
		findMatchingCards();
	}

	function findMatchingCards(){
		let firstCardIndex = undefined,
			secondCardIndex = undefined,
			firstCardClass = undefined,
			secondCardClass = undefined;
		if(matchCounter>1){
			cards.on('click.openFirst', openFirstCard)
		} else {
			//opens last pair of cards
			$('.card:not(.matched)').addClass('opened shown matched');
			clearInterval(timer);
			setTimeout(showModalWindow(),3000);
		}

		function openFirstCard(e){
			cards.off('click.openFirst');
			firstCardIndex = $(this).index();
			cards.eq(firstCardIndex).addClass("opened shown");
			firstCardClass = cards.eq(firstCardIndex).children('i').attr('class');
			cards.on('click.openSecond', openSecondCard)
		}

		function openSecondCard(e){
			cards.off('click.openSecond');
			secondCardIndex = $(this).index();
			cards.eq(secondCardIndex).addClass("opened shown");
			secondCardClass = cards.eq(secondCardIndex).children('i').attr('class');
			compareTwoCards();	
		}

		function compareTwoCards(){
			moves.text(++movesCounter);
			if(secondCardIndex != firstCardIndex){ //is one card clicked twice?
				if(secondCardClass == firstCardClass){ //does one card match to second?
					applyCardsMatching();
				} else{
					//this condition removes stars according to proficiency level
					// 2 - means one star removed if 3 times fail
					if(failNumber >= 2){
						stars.children('li').last().remove();
						failNumber = 0;
					} else { failNumber++ }
					//this line is needed to create closure and store clicked elements' index
					setTimeout(closeUnmatchedCards(firstCardIndex,secondCardIndex), 1000);
				}
			}
		}

		function closeUnmatchedCards(index1,index2){
			return function(){
				cards.eq(index1).removeClass("opened shown");
				cards.eq(index2).removeClass("opened shown");
				return findMatchingCards();
			}
		}

		function applyCardsMatching(){
			failNumber--;
			matchCounter--;
			cards.eq(firstCardIndex).children('i').addClass('matched');
			cards.eq(secondCardIndex).children('i').addClass('matched');
			return findMatchingCards();
		}
	}

	function getCardsShuffled(){
		//TODO: MAKE THE ICONS ARRAY DOUBLE WITH DEEP COPY
		icons = ['fa-diamond',
				'fa-paper-plane-o',
				'fa-anchor',
				'fa-bolt',
				'fa-cube',
				'fa-leaf',
				'fa-bicycle',
				'fa-bomb'];
		icons = icons.concat(icons.map((e)=>{return e;})) 
		const shuffledCards = shuffle(icons);
		for (let i = 0; i <shuffledCards.length; i++){
			$('.card:eq(' + i + ')').children('i').removeClass().addClass('fa' + ' ' + shuffledCards[i]);
		}
		matchCounter = icons.length/2;

		function shuffle(array) {
		   	// Shuffle function from http://stackoverflow.com/a/2450976
			var currentIndex = array.length, temporaryValue, randomIndex;

		    while (currentIndex !== 0) {
		        randomIndex = Math.floor(Math.random() * currentIndex);
		        currentIndex -= 1;
		        temporaryValue = array[currentIndex];
		        array[currentIndex] = array[randomIndex];
		        array[randomIndex] = temporaryValue;
		    }
		   return array;
		}
	}

	function stopWatch(num){
		let minutes = 0,
			seconds = 0,
			secondString;
		return timer = setInterval(function(){
			console.log('the very stopWatch')
			if (seconds+1 === 60 ){
				minutes++;
				seconds = 0;
			} else { seconds++ }
			if (seconds > 9){
				secondString = seconds;
			} else {
				secondString = '0' + seconds;
			}
			stopWatchDisplay.text( '0' + minutes + ':' + secondString);
		}, 1000)
	}

	function showModalWindow(){
		//TODO: develop modal window
		gameOver.addClass('get-visible');
		gameOver.removeClass('get-invisible');
		cards.removeClass('get-visible opened');
		cards.addClass('get-invisible');
		deck.children('table').append('<tr>\n <td>' + gameStats[0] + '</td> \n <td>' +
			gameStats[1] + '</td> \n' + '<td>' + gameStats[2] + '</td> \n' + 
			'<td>' + gameStats[3] + '</td> \n </tr>')
	}

	function closeModalWindow(){
		//TODO: develop modal window
		cards.addClass('get-visible');
		cards.removeClass('get-invisible');
		gameOver.removeClass('get-visible');
		gameOver.addClass('get-invisible');
		
	}

	function openAllCards(){
			cards.addClass("opened shown");
			setTimeout(closeAllCards, 2000);
	}

	function closeAllCards(){
		cards.removeClass("opened shown");
	}
}) //onload brackets

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
