import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
import RegistrationModal from './form/RegistrationModal';
import { TASKS_API_URL } from '../constants';
class Home extends Component {
  state = {
    items: []
  }
  componentDidMount() {
    this.getItems();
    document.title = "To Do List";
  }
  getItems = () => {
    fetch(TASKS_API_URL)
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  addTaskToState = task => {
    this.setState(previous => ({
      items: [...previous.items, task]
    }));
  }
  updateState = (id) => {
    this.getItems();
  }
  deleteItemFromState = id => {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>Tim's To Do List (REACT + ASP.NET)</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={this.state.items}
            updateState={this.updateState}
            deleteItemFromState={this.deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <RegistrationModal isNew={true} addTaskToState={this.addTaskToState} />
        </Col>
      </Row>
    </Container>;
  }
}
export default Home;