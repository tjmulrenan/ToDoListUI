import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { TASKS_API_URL } from '../../constants';
class RegistrationForm extends React.Component {
    state = {
        id: 0,
        name: '',
        description: '',
        created: ''
    }
    componentDidMount() {
        if (this.props.task) {
            const { id, name, description, created } = this.props.task
            this.setState({ id, name, description, created});
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${TASKS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description
            })
        })
            .then(res => res.json())
            .then(task => {
                this.props.addTaskToState(task);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${TASKS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateTaskIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.task ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="Name">Name:</Label>
                <Input type="text" name="name" onChange={this.onChange} value={this.state.name === '' ? '' : this.state.name} />
            </FormGroup>
            <FormGroup>
                <Label for="Description">Description:</Label>
                <Input type="text" name="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;