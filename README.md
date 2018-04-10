# FEND Memory Game Project

This game is created to improve memory.

## Get started
### To play

- go to [this link](https://leksorhayabusa.github.io/fend-project-memory-game/);
- click any card to get started;

### To Develop

- **Fork** this repository
- **Clone** it into your own machine
- You can find the _index.html_ file inside the folder _src_
- You can find the _style.css_ file inside the folder _src/css_
- You can find the _script.js_ file inside the folder _src/js_

## Features
### Technology used

This interective page is built with:
* HTML5/CSS3
* JavaScript
* JQuery
* [FontAwesome](https://fontawesome.com/)
* [Google Fonts](https://fonts.google.com/)

### Additional features
* All icons are add dinamically. This means that you cant see them in chrome devtool (in css or html)
* All results of attempts are record until the page does not reload;
* Animation on start game (shows all cards);
* Animation at the end (waterfall);
* Flip, match and mismatch cards animation;
* Stars rating;

### User experience

* When you uncover the pair of cards all other clicks are ignore;
* The same behaviour when the animation plays;
* When you win the game the timer stops automatically but does not clear until you not click "Play again" or Reload button. The same with moves counter and stars rating;
* By default 10 attempts costs one star. To change this parameter you need to change maxMoves const;
* Average* - in the result table it shows average time (in seconds) need you to find a matching pair;
* Grid is responsive;

## Game rules

You win the game when you have found the **8 pairs of matching cards**.

### First start

Click once on any card to get cards shuffled and see preview before the game start.

### Flipping cards

To flip the card and reveal its symbol, you should **click on it**. You can only have **2 active cards** at the same time.

### Matching cards

If the pair of cards you have revealed matched, the cards **stay face up** and you can click on 2 other cards to reveal their symbols.

If the pair of cards you have revealed doesn't match, the cards **flip once again to be face down** and you can make another attempt.

### Moves

Every time you **reveal 2 cards**, you make a move. Thoses moves are tracked and you can watch them at any time (next to the hash icon).

### Stars / Lifes

You start with **3 stars** (lives, represented by the heart's icon). If you make a perfect game, you keep those 3 stars, but if you do more than 2 moves but fail, you lose **one star**.

### Timer

When you **start the game** the timer starts and you can watch the time you spend to finish the game. The timer ends when you have **found the 8 pairs of matching cards**.

### Restart

You can **reset the game** at any time pressing the button _RESTART_. It will restart the full game (stars, moves, timer and re-organized the grid of cards).

### Winning screen

Once you have found the 8 pairs of matching cards, the **winning screen appears** with a summary of your game (moves, stars, time), you can play again by pressing _PLAY AGAIN_.

## Author

Original game is made by **Nikonov Oleksii** for **Google-Udacity course**.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
