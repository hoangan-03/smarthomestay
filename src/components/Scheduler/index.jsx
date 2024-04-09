import React, { Component, useState } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import './Scheduler.css';
const scheduler = window.scheduler;

//scheduler.config.api_date="%Y-%m-%d %H:%i";
export default class Scheduler extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
          events: props.events,
          timeFormatState: props.timeFormatState,
          onDataUpdated : props.onDataUpdated,
      };
    }


    initSchedulerEvents() {
        scheduler.attachEvent('onEventAdded', (id, ev) => {

            if (this.state.onDataUpdated) {
                this.state.onDataUpdated('create', ev, id);
            }



        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            if (this.state.onDataUpdated) {
                this.state.onDataUpdated('update', ev, id);
            }
        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (this.state.onDataUpdated) {
                this.state.onDataUpdated('delete', ev, id);
            }
        });
        scheduler._$initialized = true;
    }

    componentDidMount() {
        console.log("Width change")
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.hour_date = '%H:%i';
        scheduler.xy.scale_width = 70;
        

        this.initSchedulerEvents();

        //const { events } = this.props;
        this.setState({
            events: this.props.events,
            timeFormatState: this.props.timeFormatState,
          onDataUpdated : this.props.onDataUpdated,
        })
        scheduler.init(this.schedulerContainer, new Date());
        scheduler.clearAll();
        scheduler.parse(this.state.events);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        // Calculate the width of the container
        // const containerWidth = this.schedulerContainer.offsetWidth;
        // console.log("CW", containerWidth);
        // // Set the scale width of the scheduler to a percentage of the container's width
        // scheduler.xy.scale_width = containerWidth * 0.02; // Adjust the multiplier as needed
        
        // Update the view
        scheduler.updateView();
    };
    

    componentWillReceiveProps(nextProps) {
        if(this.state.events === nextProps.events) return;

        this.setState({
            events: nextProps.events,
            timeFormatState: nextProps.timeFormatState,
           onDataUpdated : nextProps.onDataUpdated,
        })

        scheduler.parse(nextProps.events);
        console.log('asas');
    }
    shouldComponentUpdate(nextProps) {
        //return this.props.timeFormatState !== nextProps.timeFormatState || this.props.events !== nextProps.events;
        return true;
    }
    componentWillUpdate()
    {
        
    }


    setHoursScaleFormat(state) {
        scheduler.config.hour_date = '%H:%i';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }

    render() {
        const { timeFormatState } = this.state;
        this.setHoursScaleFormat(timeFormatState);
        return (
            <div
                className='calendar'
                ref={ (input) => { this.schedulerContainer = input } }
                // style={{ width: "100%", height: "100%" }}
            >

            </div>
        );
    }
}