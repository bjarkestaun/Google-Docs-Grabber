Login = React.createClass({

  loginHandler() {
    var x = Accounts.loginServiceConfiguration.insert({
      service: 'google',
      clientId: 'CLIENT_ID',
      secret: 'CLIENT_SECRET'
    });
    console.log('that weird x thing', x);

    Meteor.loginWithGoogle(
      {
        requestPermissions: ['https://www.googleapis.com/auth/drive'],
        // https://www.googleapis.com/auth/userinfo.profile
        requestOfflineToken: true
      },
      function(error) {
        console.log('THIS IS THE USER INFO BRAH', Meteor.user());
        if(error) console.error(error);

        // console.log(Meteor.user().services.google.accessToken);
        Meteor.call('getSlides', function(err, results) {
          console.log('trying to get slides', err, results);
          console.log(err);
          console.log(results);


        }, );
      }
    )
  },

  componentWillUnmount() {
    // Clean up Blaze view
    Accounts.loginServiceConfiguration.remove({service: 'google'});
  },

  render() {
    // Just render a placeholder container that will be filled in
    return <button onClick={this.loginHandler} ref="container">Login with GOoooOOOo000gle</button>;
  }
});
