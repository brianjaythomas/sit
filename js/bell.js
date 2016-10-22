/**
 * Copyright 2016-present Brian Thomas
 * This file is part of sit.
 *
 * sit is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * sit is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with sit.  If not, see <http://www.gnu.org/licenses/>.
 */

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
      url: 'async/ring_bell.php',
      type: 'POST',
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('async/ring_bell.php', status, err.toString());
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
