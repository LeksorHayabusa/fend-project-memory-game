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
		gameStats = [],
		matchCounter, 
		startTime,
		failNumber,
		timer,
		gameReady,
		i = 0;//gameStats array index  and counter of plays numbers

	cards.on('click.firstStart', restartGame);
	restartButton.on('click', restartGame);

	function restartGame(){
		cards.off('click.firstStart');
		clearInterval(timer);
		gameStats.push([0,0,0]);//pushes game statistics array for current game
		failNumber = 0;
		closeModalWindow();
		cards.off('click.openFirst');
		cards.off('click.openSecond');
		moves.text(0);//it's not a function just text replacement
		getCardsShuffled();	
		previewAllCards();
		setTimeout(findMatchingCards, 3000); // that's workaround to wait until all cards are reviewed and closed
		clearInterval(timer);
		stopWatch(0);//starts stopWatch
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
			gameStats[i][0] = stars.children('li').length;
			gameStats[i][2] = stopWatchDisplay.text();
			setTimeout(showModalWindow,1000);
		}

		function openFirstCard(e){
			cards.off('click.openFirst');
			//check a click on already matched card
			if (!$(this).hasClass('matched')){
				firstCardIndex = $(this).index();
				cards.eq(firstCardIndex).addClass("opened shown");
				firstCardClass = cards.eq(firstCardIndex).children('i').attr('class');
				cards.on('click.openSecond', openSecondCard)
			} else {cards.on('click.openFirst', openFirstCard)}
		}

		function openSecondCard(e){
			cards.off('click.openSecond');
			secondCardIndex = $(this).index();
			cards.eq(secondCardIndex).addClass("opened shown");
			secondCardClass = cards.eq(secondCardIndex).children('i').attr('class');
			setTimeout(compareTwoCards, 500);	
		}

		function compareTwoCards(){
			let secondNotMatched = cards.eq(secondCardIndex).children('i');
			if(secondCardIndex != firstCardIndex && !cards.eq(secondCardIndex).hasClass('matched')){ //is one card clicked twice?
				if(secondCardClass == firstCardClass){ //does one card match to second?
					applyCardsMatching();
				} else{
					//this condition removes stars according to proficiency level
					// 2 - means one star removed if 3 times fail
					cards.eq(firstCardIndex).addClass("mismatched");
					cards.eq(secondCardIndex).addClass("mismatched");
					if(failNumber >= 2){
						stars.children('li').last().remove();
						failNumber = 0;
					} else { failNumber++ }
					//this line is needed to create closure and store clicked elements' index
					setTimeout(closeUnmatchedCards(firstCardIndex,secondCardIndex), 1000);
				}
				moves.text(++gameStats[i][1]);
			} else {(cards.on('click.openSecond', openSecondCard))}
		}

		function closeUnmatchedCards(index1,index2){
			return function(){
				cards.eq(index1).removeClass("opened shown mismatched");
				cards.eq(index2).removeClass("opened shown mismatched");
				return findMatchingCards();
			}
		}

		function applyCardsMatching(){
			failNumber--;
			matchCounter--;
			cards.eq(firstCardIndex).addClass('matched');
			cards.eq(secondCardIndex).addClass('matched');
			return findMatchingCards();
		}
	}

	function getCardsShuffled(){
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
		return timer = setInterval(()=>{
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
		cards.addClass('cardsDisappearance');
		setTimeout(()=>{
			cards.addClass('get-invisible');
		cards.removeClass('get-visible')
		gameOver.removeClass('get-invisible');
		gameOver.addClass('get-visible');
		},1500);
		showGameResult();
		
		function showGameResult(){	
				$('.stats-table  tbody').append('<tr><td>' + (i+1) + '</td><td>' +
					gameStats[i][0] + '</td><td>' + gameStats[i][1] + '</td><td>' + gameStats[i][2] + '</td></tr>');
				i++;
		}
	}

	function closeModalWindow(){
		cards.removeClass('get-invisible opened shown matched cardsDisappearance');
		gameOver.removeClass('get-visible').addClass('get-invisible');
	}

	function previewAllCards(){
		cards.each(function(i){
			let delay = Math.floor(Math.random()*1000);
			//starts show cards randomly
			gameReady = setTimeout(()=>{cards.eq(i).addClass("opened shown")
			//starts close cards randomly
			setTimeout(()=>{cards.eq(i).removeClass("opened shown")}, 2000 + delay);
			}, delay);
		})
	}

}) //onload brackets

