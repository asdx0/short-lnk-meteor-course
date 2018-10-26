import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from "../imports/routes/routes";
import '../imports/startup/simple-schema-configuration';


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});


// Stateless functional component - doesn't support react component states
// the whole thing acts like the render method
// faster than ES6 components, only used for presentational components
// easier to test

// const MyComponent = (props) => {
//     return (
//       <div>
//           <h1>My Component is here {props.name}</h1>
//       </div>
//     );
// };

// Session.set('name', 'Ashley dePreaux');
//
//
// Tracker.autorun(() => {
//     const name = Session.get('name');
//     console.log('Name: ', name);
// });
//


Meteor.startup(() => {
    // Meteor.call('greetUser', (err, result) => {
    //     console.log('Greet User arguments:', err, result);
    //     // returns 'Greet User arguments: undefined hello user!
    // });
    Session.set('showVisible', true);
    ReactDOM.render(routes, document.getElementById('app'));
});
