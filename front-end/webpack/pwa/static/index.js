import _ from 'lodash';
import printMe from './print.js';

// if ('serviceWorker' in navigator) {
//     console.log('start1');
//     window.addEventListener('load', () => {
//         console.log('start2');
//         navigator.serviceWorker.register('/service-worker.js')
//             .then(registration => {
//                 console.log('SW registered: ', registration);
//             })
//             .catch(registrationError => {
//                 console.error('SW registration failed: ', registrationError);
//             });
//     });
// }
console.log(22244554);

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello2', 'webpack123'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
