import React, {useEffect, useState} from "react";

import { Card, CardBody, CardFooter, Container, Row, Col } from "reactstrap";
import { Component } from 'react';

// import NotesHeader from "components/Headers/NotesHeader.js";
import Scheduler from '../../components/Scheduler';
import "./Calendar.css";
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';

const scheduler = window.scheduler;




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
      var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
      var start_datee = formatFunc(ev.start_date);
      var end_datee = formatFunc(ev.end_date);
      let addedEvent = {};
      addedEvent.start_date = start_datee
      addedEvent.end_date = end_datee
      addedEvent.text = ev.text
      addedEvent.id = ev.id
      
      if(action == 'create')
      {
        fetch('https://savig-project.vercel.app/api/create',
        {
          method: 'post',
          headers:{
            "Content-Type": "application/json",
          },  
          body: JSON.stringify(addedEvent),
        })
      }
      else if(action == 'delete')
      {
        fetch('https://savig-project.vercel.app/api/delete',
        {
          method: 'post',
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: ev.id}),
        })
      }
      else if(action == 'update')
      {
        fetch('https://savig-project.vercel.app/api/update',
        {
          method: 'post',
          headers:{
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

  fetch('https://savig-project.vercel.app/api').then((response) => {return response.json()}).then((dataa) => {
    //const tmp = dataa;
    that.setState({data : dataa, test: "yeah",});
    console.log(that.state.data);
    console.log(that.state.test);
  })
  .catch(console.error);
  console.log('gfsadjk');
  
  }
  render() {

    

     var { currentTimeFormatState, messages, data } = this.state;
    
    
    return (
      <>
        <div className="scheduler-container">
          <Scheduler
            events={this.state.data}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        
      </>
    );
  }
}
export default Calendar;

