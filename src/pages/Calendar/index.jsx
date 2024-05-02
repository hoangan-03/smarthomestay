import React from "react";
import { Component } from 'react';
import { useNavigate } from "react-router-dom";
import Scheduler from '../../components/Scheduler';
import "./Calendar.css";
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';

const scheduler = window.scheduler;

function CalendarWrapper(props) {
  const navigate = useNavigate();

  return <Calendar {...props} navigate={navigate} />;
}

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTimeFormatState: true,
      messages: [],
      data: null,
      test: '',
    };
  }

  addMessage(message) {

    console.log("ADD MESSAGE")
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];
    console.log("MEssage", messages)

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : '';
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
    //console.log(Scheduler.getEvent(id).start_date);
    // var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    var start_datee = ev.start_date;
    var end_datee = ev.end_date;
    var remind_time = new Date(start_datee);
    remind_time.setHours(remind_time.getHours() - 1);
    console.log(remind_time);
    let addedEvent = {};
    addedEvent.start_date = start_datee
    addedEvent.end_date = end_datee
    addedEvent.text = ev.text
    addedEvent.id = ev.id
    addedEvent.room = ev.room
    addedEvent.remind_time = remind_time


    if (action === 'create') {
      console.log("Create")
      console.log("Body", JSON.stringify(addedEvent))
      fetch('https://savig-project.vercel.app/api/create',


        {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addedEvent),

        })
    }
    else if (action === 'delete') {
      console.log("Delete")
      fetch('https://savig-project.vercel.app/api/delete',
        {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: ev.id }),
        })
    }
    else if (action === 'update') {
      console.log("Update")
      fetch('https://savig-project.vercel.app/api/update',
        {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addedEvent),
        })
    }

  }

  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state
    });
  }

  componentDidMount() {
    console.log('componentDidMount')
    const that = this;

    fetch('https://savig-project.vercel.app/api').then((response) => { return response.json() }).then((dataa) => {
      that.setState({ data: dataa, test: "yeah", });
      console.log(that.state.data);
      console.log(that.state.test);
    })
      .catch(console.error);

    const user = this.props.getCookie('cookieUser')
    if (!user) {
      this.props.navigate('/auth');
    }

  }
  render() {
    var { currentTimeFormatState } = this.state;
    const { toggleDarkMode } = this.props;

    return (
      <>
        <div className="scheduler-container">
          <Scheduler
            events={this.state.data}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={this.logDataUpdate}
            toggleDarkMode={toggleDarkMode}
          />
        </div>

      </>
    );
  }
}
export default CalendarWrapper;