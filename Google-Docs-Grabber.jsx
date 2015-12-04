//****************************
//          Client Code
//****************************
if (Meteor.isClient) {
  // This code is executed on the client only
  var scopes = ['https://www.googleapis.com/auth/drive'];

  Accounts.ui.config({
    'passwordSignupFields': 'USERNAME_ONLY',
    'requestPermissions': { 'google': scopes },
  });

  Meteor.subscribe("tasks");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

//****************************
//          Server Code
//****************************

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ]
    });
  });

  Meteor.methods({
    getSlides(userId) {
      // this.unblock();


      return Meteor.http.call('GET', 'https://www.googleapis.com/drive/v2/files', { params: {user: userId}}, function(err, results) {
        console.log('err', err);
        console.log('results', results);
      });

      const options = {
        headers: {
          Authentication: 'Bearer '
        }
      }

      HTTP.get('https://www.googleapis.com/drive/v2/files', options)
    },
  })
}

//****************************
//          Shared methods
//****************************
Meteor.methods({
});

// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
