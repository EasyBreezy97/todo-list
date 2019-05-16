import React , {Component} from 'react';
import EnterData from './components/EnterData/EnterData';
import {Container,ListGroupItem,Button,ListGroup} from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [],
    NewTodoData : {
      id:'',
      task: ''
    }

  }

  componentWillMount(){
    this._refreshTodo();
  }

  addTodoItem = (e) => {
    let NewTodoData = this.state.NewTodoData;
    NewTodoData.task = e.target.value
    this.setState({NewTodoData});
  }

  submitInTodoList = () => {
    axios.post('http://localhost:3000/todo',this.state.NewTodoData)
      .then(response =>{
        let newTodo = [...this.state.todos];
        newTodo.push(response.data);
        this.setState({todos:newTodo});
      })
  }

  deleteTodoItem = (id) => {
    axios.delete('http://localhost:3000/todo/'+id)
      .then(response => {
        this._refreshTodo();
      })
  }

  _refreshTodo = () => {
    axios.get('http://localhost:3000/todo')
    .then(response => {this.setState({todos:response.data})
    })
  }
 
  render(){
    let todos = this.state.todos.map(todo => {
          return (
            <ListGroup key ={todo.id}>
              <ListGroupItem >
              {todo.task}
              <Button onClick = {() => this.deleteTodoItem(todo.id)} color="danger" size="sm" className = "float-right">Delete</Button>
              </ListGroupItem>
            </ListGroup>
          )
    });
    return (
      <div className="App">
        <Container>
          <h1 className="text-center">Todo List</h1>
          <EnterData add = {this.addTodoItem} submit = {this.submitInTodoList}/>
          {todos}
        </Container>
      </div>
    );
  }
}

export default App;
