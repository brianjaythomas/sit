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

var Event = class {
  constructor(
    name,
    end_time // unix timestamp, in ms
  ) {
    this.name = name;
    this.end_time = end_time;
  }
}

var Timer = class {
  constructor(
    schedule = []
  ) {
    // arrayof(Event), ordered by end_time, earliest first
    this.schedule = schedule; 
    this.timeout = undefined; // in case we need to cancel the timer
  }

  begin() {
    this.startNewEvent(/* ring_bell */ false);
  }

  handleEventTransition() {
    // Mark the end of the previous event
    Bell.ring();
    
    if (this.schedule.length == 0) {
      this.finishSchedule();
      return;
    }

    this.startNewEvent();
  }

  startNewEvent() {
    var event = this.schedule.shift();
    var time_until_end = event.end_time - this.getTime();    
    if (time_until_end <= 0) {
      throw 'Expected time in the future!';
    }
    
    console.log('Event:', event.name, time_until_end, this.getTime());
    this.timeout = setTimeout(
      () => this.handleEventTransition(),
      time_until_end
    );
  }

  finishSchedule() {
    console.log('schedule complete', this.getTime());
  }

  getTime() {
    return (new Date()).getTime();
  }
}

class Bell {
  static ring() {
    console.log('ding!');
    
    // $.ajax({
    //   url: 'async/ring_bell.php',
    //   type: 'POST',
    //   success: function(data) {
    //     console.log(data);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error('async/ring_bell.php', status, err.toString());
    //   }.bind(this)
    // });
  }
}

var TestBell = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Test bell" />
      </form>
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    Bell.ring();
  }
});

var TestTimer = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Test timer" />
      </form>
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var time = (new Date()).getTime();
    var schedule = [
      new Event('sit', time+2000),
      new Event('walk', time+4000),
      new Event('sit', time+6000),
    ];
    new Timer(schedule).begin();
  }
});

var MeditationBell = React.createClass({
  render: function() {
    return (
      <div>
        Hello, world! I am a Meditation Bell!
        <TestBell />	  
        <TestTimer />	  
      </div>
    );
  }
});

ReactDOM.render(
  <MeditationBell />,
  document.getElementById('example')
);
