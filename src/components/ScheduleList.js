import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem, Header} from './common';
import {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate} from '../actions';
import { unBordered, screenView,textureStyle } from '../style';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
    this.createDataSource(this.props.schedules.sort(compareSchedule), this.props.templates);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.schedules.sort(compareSchedule), nextProps.templates);
  }
  createDataSource(schedules, templates) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(schedules)

    const ts = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.tempSource = ts.cloneWithRows(templates)
  }
  renderScheduleRow (schedule) {
    return <ListItem
            style={{marginBottom: 10}}
            rowData = {schedule.title}
            rightData = {schedule.date}
            onRowPress = {() => {
              Actions.singleSchedule({schedule})
              }}
            onDelPress = {() => {this.props.removeSchedule(schedule.uid)}}
            delText = 'X'
            leftAction = 'true'
            onActionPress = {() => {this.props.saveTemplate(schedule)}}
            leftActionChild = {
              <View />

            }
          />
  }
  renderTemplateRow (template) {
    return <ListItem
            style={{marginBottom: 2}}
            rowData = {template.title}
            rightData = {template.date}
            onDelPress = {() => {this.props.removeTemplate(template.uid)}}
            delText = 'X'
          />
  }
  renderHeaderRow(text) {
    return(
      <Header viewStyle={styles.listHeaderStyle}>
        <Text>{text}</Text>
      </Header>
      )
  }

  render () {
    const {schCardStyle, tmpCardStyle,logoutBtnStyle} = styles;
    return (
  <View style={screenView}>
  <Image
    source={require('./imgs/concrete-texture.jpg')}
    resizeMode="cover"
    style={textureStyle}/>

    <Card style={schCardStyle}>
      <ListView
        enableEmptySections
        stickyHeaderIndices={[0]}
        renderHeader = {()=>this.renderHeaderRow('Schedules')}
        dataSource = {this.dataSource}
        renderRow = {this.renderScheduleRow.bind(this)}>
      </ListView>
      </Card>
      <Card style={tmpCardStyle}>
      <ListView
        enableEmptySections
        renderHeader = {() => this.renderHeaderRow('Templates')}
        stickyHeaderIndices={[0]}
        dataSource = {this.tempSource}
        renderRow = {this.renderTemplateRow.bind(this)}>
      </ListView>
    </Card>

    <View style={logoutBtnStyle}>
      <Button onPress={() => this.props.logout()}>
        Logout
      </Button>
    </View>
  </View>
    );
  }
}

const styles = {
  schCardStyle: {
    flex: 3,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  tmpCardStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  listHeaderStyle: {
    marginTop: 0,
    paddingTop:0,
    height: 20,
    backgroundColor: 'rgba(25,25,112,0.2)',
    justifyContent: 'center'
  },
  logoutBtnStyle: {
    ...unBordered,
    bottom: 0
  }
}

const mapState = (state) => {
  const schedules = _.map(state.schedules.list, (val, uid) => {
    return {...val, uid}
  });
  const templates = _.map(state.schedules.temps, (val, uid) => {
    return {...val, uid}
  });
  return {schedules, templates};
};

export default connect(mapState, {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate})(ScheduleList);

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}
