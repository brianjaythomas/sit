var BellRinger = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Ring bell" />
      </form>
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    $.ajax({
      url: 'ring_bell.php',
      type: 'POST',
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ring_bell.php', status, err.toString());
      }.bind(this)
    });
  }
});

var MeditationBell = React.createClass({
  render: function() {
    return (
      <div>
        Hello, world! I am a Meditation Bell!
        <BellRinger />	  
      </div>
    );
  }
});

ReactDOM.render(
  <MeditationBell />,
  document.getElementById('example')
);
