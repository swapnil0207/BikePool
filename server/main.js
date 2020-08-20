import { Meteor } from 'meteor/meteor';
//import '../lib/collections.js';
import {User} from '../lib/collections';
Meteor.startup(() => {
  // code to run on server at startup
  //console.log(process.env);
//process.env.MONGO_URL='mongodb+srv://swapnil_j0207:Swapnilj2@cluster0.ji79r.mongodb.net/dbname?retryWrites=true&w=majority' ;
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