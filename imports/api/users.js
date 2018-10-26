import {Accounts} from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";
import {Meteor} from "meteor/meteor";

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({email});

    console.log('this is the user', user);
    return true;
});
