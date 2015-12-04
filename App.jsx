// App component - represents the whole app
App = React.createClass({

  // // This mixin makes the getMeteorData method work
  // mixins: [ReactMeteorData],

  getInitialState() {
    return null;
  },

  render() {
    return (
      <Login />
    );
  }
});
