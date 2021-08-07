import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './form/RegistrationModal';
import { TASKS_API_URL } from '../constants';
class DataTable extends Component {
  deleteItem = id => {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion) {
      fetch(`${TASKS_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const items = this.props.items;
    return <Table striped>
      <thead className="thead-dark">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="4" align="center"><b>No Tasks yet</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.id}>
              <th scope="row">
                {item.id}
              </th>
              <td>
                {item.name}
              </td>
              <td>
                {item.description}
              </td>
              <td>
              {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "medium" }).format(new Date(item.created))}
              </td>
              <td align="center">
                <div>
                  <RegistrationModal
                    isNew={false}
                    task={item}
                    updateTaskIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default DataTable;