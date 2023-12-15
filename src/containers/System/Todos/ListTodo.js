import React from "react";
import './ListTodo.scss'
import AddTodo from "./AddTodo";
import { toast } from 'react-toastify';
import Color from "../HOC/Color";

class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Sleep' },
            { id: 'todo2', title: 'Swim' },
            { id: 'todo3', title: 'Suck' },
        ],
        editTodo: {}
    }

    addNewTodo = (todo) => {
        // let currentListtodo = this.state.listTodos;
        // currentListtodo.push(todo);
        this.setState({
            listTodos: [...this.state.listTodos, todo],
            // listTodos: currentListTodo
        })

        toast.success('Wow so easy')
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state
        let isEmbtyObj = Object.keys(editTodo).length === 0;
        //save
        if (isEmbtyObj === false && editTodo.id === todo.id) {

            let listTodosCopy = [...listTodos]
            //Find index of specific object using findIndex method.    
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            //Update object's name property.
            listTodosCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })
            toast.success('Update todo succeed')
            return;
        }
        //edit
        this.setState({
            editTodo: todo
        })

    }

    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodos
        })
        toast.success("Delete succeed!")
    }

    handleOnChangEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render() {
        let { listTodos, editTodo } = this.state;
        let isEmbtyObj = Object.keys(editTodo).length === 0;

        return (
            <>
                <p>Basic TODO Apps with React.js (Apo &amp; Thinh)</p>
                <div className="list-todo-container">
                    <AddTodo
                        addNewTodo={this.addNewTodo}

                    />
                    <div className="list-todo-content">
                        {listTodos && listTodos.length > 0 &&
                            listTodos.map((item, index) => {
                                return (
                                    <div className="todo-child" key={item.id}>
                                        {isEmbtyObj === true ?
                                            <span> {index + 1} - {item.title} </span>
                                            :
                                            <>
                                                {editTodo.id === item.id ?
                                                    <span>
                                                        {index + 1} - <input value={editTodo.title}
                                                            onChange={(event) => this.handleOnChangEditTodo(event)}
                                                        />
                                                    </span>
                                                    :
                                                    <span>
                                                        {index + 1} - {item.title}
                                                    </span>
                                                }
                                            </>
                                        }
                                        <button className="edit"
                                            onClick={() => this.handleEditTodo(item)}>
                                            {isEmbtyObj === false && editTodo.id === item.id ?
                                                'Save' : 'Edit'}</button>
                                        <button className="delete"
                                            onClick={() => this.handleDeleteTodo(item)}
                                        >Delete</button>
                                    </div>)
                            })}

                    </div>
                </div>
            </>
        )
    }
}
export default Color(ListTodo);