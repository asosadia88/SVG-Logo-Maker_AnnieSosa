const inquirer = require('inquirer');
const fs = require('fs');
const {Shape, Circle, Square, Triangle} = require('./lib/shapes.js');

//https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/input.js
const questions = [
    {
        type: 'input',
        name: 'letters',
        message: 'What letters do you want in the logo?',
        validate(value){
            const pass = value.length > 0 && value.length <= 3;
            if(pass){
                return true;
            } else {
                return 'Please enter a valid set of letters for the logo (1-3 characters)'
            }
        }
    },
    {
        type: 'input',
        name: 'text_color',
        message: 'What color do you want for the text in the logo?',
        validate(value){
            // https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
            const color_strings = ['black','silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua'];
            const pass = color_strings.includes(value) || (value.length == 6 && isAlphanumeric(value));
            if(pass){
                return true;
            }
            return 'Please enter a valid color (can be one of the basic keywords in https://developer.mozilla.org/en-US/docs/Web/CSS/named-color or a 6-digit valid hexadecimal number without the # sign.)';
        }
    },
    {
        type: 'list',
        name: 'shape',
        message: 'What shape do you want for the logo?',
        choices: ['Triangle', 'Square', 'Circle']
    },
    {
        type: 'input',
        name: 'shape_color',
        message: 'What color do you want for the shape in the logo?',
        validate(value){
            // https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
            const color_strings = ['black','silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua'];
            const pass = color_strings.includes(value) || (value.length == 6 && isAlphanumeric(value));
            if(pass){
                return true;
            }
            return 'Please enter a valid color (can be one of the basic keywords in https://developer.mozilla.org/en-US/docs/Web/CSS/named-color or a valid hexadecimal number without the # sign.)';
        }
    }
]
// https://javascript.plainenglish.io/check-if-string-is-alphanumeric-in-javascript-e325caa3ee
function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function handleData(data){
    var outputString = '';
    if(data.shape === 'Square'){
        var square = new Square();
        square.setColor(data.shape_color);
        square.setText(data.letters);
        square.setTextColor(data.text_color);
        outputString = square.render();
    }
    if(data.shape === 'Circle'){
        var circle = new Circle();
        circle.setColor(data.shape_color);
        circle.setText(data.letters);
        circle.setTextColor(data.text_color);
        outputString = circle.render();
    }
    if(data.shape === 'Triangle'){
        var triangle = new Triangle();
        triangle.setColor(data.shape_color);
        triangle.setText(data.letters);
        triangle.setTextColor(data.text_color);
        outputString = triangle.render();
    }
    fs.writeFile('./examples/logo.svg', outputString, (err) => {
        if(err){
            console.log('Logo was not created successfully.');
            throw err;
        } else {
            console.log('Generated logo.svg.');
        }
    });
}

function init() {
    inquirer
            .prompt(questions)
        .then((answers) => {
            handleData(answers);
        })
        .catch((error) => {
            if (error.isTtyError) {
                throw error;
            } else {
                console.log('There was an error handling data');
            }
        });
}

init();