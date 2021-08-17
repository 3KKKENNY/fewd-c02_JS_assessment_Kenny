const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let currentlyPlaying = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }

    ask() {
        let move = prompt('Which direction do you want to move to? (w for Up, s for down, a for left and d for right)');
        
        if ( move.toLowerCase() === 'w' ) {
            console.log('Moving up');
                this.y -= 1;
                return;
        } else if ( move.toLowerCase() === 's') {
            console.log('Moving down');
                this.y += 1;
                return;
        } else if ( move.toLowerCase() === 'a') {
            console.log('Moving down');
                this.x -= 1;
                return;
        } else if ( move.toLowerCase() === 'd') {
            console.log('Moving down');
                this.x += 1;
                return;
        }   
    }

    checkWin() {
        
        if (this.field[this.y] == undefined) {
            console.log('You lose - Out of boundary');
            return currentlyPlaying = false;            
        }
        
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('You lose ~~~');
                currentlyPlaying = false;
                break;
            case undefined:
                console.log('You lose ~~~');
                currentlyPlaying = false;
                break;
            case hat:
                console.log('You win !!!');
                currentlyPlaying = false;
                break;
            case fieldCharacter:
                console.log('Keep looking for the hat...');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
        }    
    }

    static generateField(height, width, percentage) {

        
        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const ranNum = Math.random() * 100;
              if (ranNum < percentage) {
                return hole;
              } else {
                return fieldCharacter;
              }
            } else {
              console.log('Please enter a number between 0 - 100');
            }
        }

        
        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i=0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i=0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameReadyField = plainField();

        
        do {
            gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (gameReadyField[0][0] == hat);
        
        
        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }

}
let width = prompt('WIDTH: ')
let height = prompt('HEIGHT: ')
let percentage = prompt('PERCENTAGE OF HOLE: ')
const myField = new Field(Field.generateField(width, height, percentage));


function game() {
    while(currentlyPlaying) {
        console.log(myField.print());
        myField.ask();
        myField.checkWin();
    }
    console.log('Game Over!');
}

game();