const inquirer = require('inquirer');
const fs =require('fs');
const{Shape, Circle, Square, Triangle} = require('./lib/shapes.js');

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
    {   type: 'input',
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
