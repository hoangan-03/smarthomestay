import React from "react";
import { Component } from 'react';
import { useNavigate } from "react-router-dom";
import Scheduler from '../../components/Scheduler';
import "./Calendar.css";
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import axios from "axios";

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
    var start_datee = ev.start_date;
    var remind_time = new Date(start_datee);
    remind_time.setHours(remind_time.getHours() - 1);

    if (action === 'create') {
      const book = {
        Id: ev.id,
        Room_id: parseInt(ev.room_id),
        Start_date: new Date(ev.start_date).toISOString(),
        Text: ev.text,
        Remind_time: remind_time,
        End_date: new Date(ev.end_date).toISOString(),
      };
      console.log("Book", book)
      axios
        .post("https://smart-homestay-backend-f109bac03e4d.herokuapp.com/add_booking", book)
        .then((res) => {
          console.log("Log added successfully");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              console.log(err.response.data.error);
            } else if (err.response.status === 500) {
              console.error("Internal Server Response");
            }
          } else {
            console.error(err);
          }
        });
    }
    else if (action === 'delete') {
      axios.delete(`https://smart-homestay-backend-f109bac03e4d.herokuapp.com/delete_booking/${ev.id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
    else if (action === 'update') {
      const book = {
        Id: ev.id,
        Room_id: parseInt(ev.room_id),
        Start_time: new Date(ev.start_date).toISOString(),
        Text: ev.text,
        Remind_time: remind_time,
        End_time: new Date(ev.end_date).toISOString(),
      };
      axios.put(`https://smart-homestay-backend-f109bac03e4d.herokuapp.com/modify_booking/${ev.id}`, book)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state
    });
  }

  componentDidMount() {


    axios.get('https://smart-homestay-backend-f109bac03e4d.herokuapp.com/get_bookings')
      .then(response => {
        console.log("Response", response.data)
        const data = response.data.bookings.map(event => ({
          ...event,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          text: event.text,
          remind_time: new Date(event.Remind_time),
        }));
        this.setState({ data });
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