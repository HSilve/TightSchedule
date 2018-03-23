import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem} from './common';
import {fetchSchedules, removeSchedule} from '../actions';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
    this.createDataSource(this.props.schedules.sort(compareSchedule));
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.schedules.sort(compareSchedule));
  }
  createDataSource(schedules) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(schedules)
  }
  renderScheduleRow (schedule) {
    return <ListItem
            rowData = {schedule.title}
            rightData = {schedule.date}
            onRowPress = {() => {
              Actions.singleSchedule({schedule})
              }}
            onDelPress = {() => {this.props.removeSchedule(schedule.uid)}}
            delText = 'x'
          />
  }
  render () {
    return (
    <Card>
      <ListView
        enableEmptySections
        dataSource = {this.dataSource}
        renderRow = {this.renderScheduleRow.bind(this)}
      >
      </ListView>
    </Card>
    );
  }
}

const mapState = (state) => {
  const schedules = _.map(state.schedules, (val, uid) => {
    return {...val, uid}
  });
  return {schedules};
  // return {schedules: state.schedules}
};

export default connect(mapState, {fetchSchedules, removeSchedule})(ScheduleList);

function compareSchedule(a, b) {
  if (a.date < b.date || (a.date && !b.date)) {
    return -1;
  }
  if (b.date < a.date || b.title < a.title) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
