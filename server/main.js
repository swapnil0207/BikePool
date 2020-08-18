import { Meteor } from 'meteor/meteor';
//import '../lib/collections.js';
import {User} from '../lib/collections';
Meteor.startup(() => {
  // code to run on server at startup
	User.allow({
    'insert': function (_id,name,mobile,pincode,gender,area,email,password) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
});

Meteor.publish("user",function()
	{
	return User.find({});
	}
)