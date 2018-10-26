import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {
  // code to run on server at startup
  //   let now = new Date();
  //   console.log(now);
  //
  //   let momentNow = moment(now);
  //   console.log(momentNow.format('h:mma'));

    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = Links.findOne({_id});
        if(link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }
    });
    // WebApp.connectHandlers.use((req, res, next) => {
    //     console.log('This is from my custom middleware');
    //     console.log(req.url, req.method, req.headers, req.query);
    //     // // set http status code
    //     // res.statusCode = 404;
    //     //
    //     // // set http headers
    //     // res.setHeader('my-custom-header', 'Ashley was here');
    //     //
    //     // // set http body
    //     // res.write('<h1>This is my middleware at work</h1>');
    //     // // end http request
    //     // res.end();
    //     next();
    // });

    // const petSchema = new SimpleSchema({
    //     name: {
    //         type: String,
    //         min: 1,
    //         max: 200,
    //         optional: true
    //     },
    //     age: {
    //         type: Number,
    //         min: 0
    //     },
    //     contactNumber: {
    //         type: String,
    //         optional: true,
    //         regEx: SimpleSchema.RegEx.Phone
    //     }
    // });
    //
    // petSchema.validate({
    //     name: 'Ashley',
    //     age: 1,
    //     contactNumber: '1234'
    // });

    // Meteor.call('greetUser', (err, result) => {
    //    console.log('Greet User arguments:', err, result);
    //    // returns 'Greet User arguments: undefined hello user!
    // });

});
