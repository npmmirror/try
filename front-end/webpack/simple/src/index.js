import printMe from './print';
// import './styles.css';
import {cube} from "./math";

import _ from 'lodash';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} else {
    console.log('in production');
}

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash, now imported by this script
    element.innerHTML = _.join([
        'hello webpack',
        '5 cubed is equal to ' + cube(5)
    ], '\n\n');

    btn.innerHTML = 'Click88034 me!';
    btn.onclick = e => {
        printMe();
    };

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('updated!');
        printMe();
    });
}
