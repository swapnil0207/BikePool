import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {User} from '../lib/collections';
import { Session } from 'meteor/session'
import './main.html';

Meteor.subscribe("user");


Template.start.onCreated( function(){
    var self = this;
    self.vars = new ReactiveDict();
    self.vars.setDefault( 'clicked' , true ); //default is true
});

Template.start.events({
  'click .startb':function(event,template){
    var instance = Template.instance();
        instance.vars.set('clicked', false) //set to true.
  }
})

Template.start.helpers({
 clicked:function(){
 var instance = Template.instance(); //http://docs.meteor.com/#/full/template_instance
 return  instance.vars.get('clicked') //this will return false(default) | true
 }
})




Template.search.helpers({
  list:function() {
	 var gender=Session.get('gender'); 
    var lst=User.find({'gender':gender});
	console.log("log "+gender);
	return lst;
  
  },
});

Template.login.events({
  'submit .mylogin'(event) {
    // Prevent default browser form submit
      event.preventDefault();
	  const target = event.target;
      // Get value from form element
      const email = target.emaillogin.value;
	  const pass = target.passlogin.value;
	  var indb=User.findOne({'email':email,'password':pass});
		if(indb!=undefined)
		{
			Session.set('gender',indb.gender);
			console.log("indb"+indb.gender);
		}
	else{
		return alert("Either password is incoorrect or You don't have an account with us Please Register");
	}
  }
})

Template.register.events({
  'submit .myform'(event) {
    // Prevent default browser form submit
      //event.preventDefault();
	  const target = event.target;
      // Get value from form element
      
      const name = target.name.value;
	  const mobile = target.mobile.value;
	  const pincode = target.pincode.value;
	  const gender = target.gender.value;
	  const areal = target.areal.value;
	  const email = target.email.value;
	  const pass = target.pass.value;
	  if(name!=""||mobile!=""||pincode!=""||areal!=""||gender!=""||email!=""||pass!="")
	  { 
		if(User.findOne({'email':email}))
			return alert("You already have an Account Please Login");
		else{
		Session.set('gender',gender);
		// Insert a task into the collection
      User.insert({"name":name,"mobile":mobile,"pincode":pincode,"gender":gender,"area":areal,"email":email,"password":pass});
		//User.insert({"name":name});
		}
	  }
	  else{
		  return alert("Please Fill all Data to register ");
	  }
  }
});