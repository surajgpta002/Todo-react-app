import { nanoid } from 'nanoid';
import React from 'react'
import '../components/Todolist.css'

export default class Todolist extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            currentValue: "",
            isEdit: false,
            editedValue: "",
            currentID: ""
        }
    }
    updateValue(e) {
        this.setState({ currentValue: e.target.value });
    }

    updateEditValue(e) {
        this.setState({ editedValue: e.target.value })
    }
    addTodo(ele) {
        const obj = {
            _id: nanoid(),
            taskName: this.state.currentValue
        }
        if (this.state.currentValue !== "") {
            this.setState({ todos: this.state.todos.concat(obj) })
            this.setState({ currentValue: "" })
        }
        ele.value = "";
    }

    editTask(id,task) {
        document.getElementById("floatingInput").value = task;
        this.setState({ isEdit:true })
        this.setState({ currentID: id })
        
    }

    updateTodo(ele) {
        if (this.state.editedValue !== "") {
            
            this.state.todos.forEach((val) =>{
                if (val._id === this.state.currentID) {
                    val.taskName = this.state.editedValue;
                }
            })
            this.setState({ currentID: "" })
            this.setState({ isEdit: false })
            this.setState({ editedValue: "" })

            ele.value = "";
        }

    }

    deleteTask(id) {
        this.state.todos.forEach(todo => {
            if (todo._id === id){
                let copyTodo = this.state.todos;
                copyTodo.splice(copyTodo.findIndex(()=>todo.taskName),1)
               this.setState({todos: copyTodo}); 
            }
        });
    }
    render() {

        const listItems = this.state.todos.map((val) => (
            <div className="row mt-3" key={val._id}>
                <div className="col-8 text-start">{val.taskName}</div>
                <div className="col-4 button-area">
                    <button className='btn btn-warning edit-btn' onClick={() => this.editTask(val._id,val.taskName)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                    </button>
                    <button className="btn btn-danger del-btn" onClick={() => this.deleteTask(val._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        ))
        return (
            <>
                <h1 className='text-center'>Your Pocket Todo App</h1>
                <div className='m-4 d-flex justify-content-around main-container'>
                    {this.state.isEdit === true ? (<form id="dataEntry" className='mt-3'>
                        <div className="mb-3">
                            <div className="h4">Edit</div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="taskName" onChange={(e) => this.updateEditValue(e)} />
                                <label htmlFor="floatingInput">Edit Task</label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary task-submit" onClick={() => this.updateTodo(document.getElementsByName("taskName")[0])}>Edit</button>
                    </form>) : (<form id="dataEntry" className='mt-3'>
                        <div className="mb-3">
                            <div className="h4">Add</div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="taskName" onChange={(e) => this.updateValue(e)} />
                                <label htmlFor="floatingInput">Enter Task</label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary task-submit" onClick={() => this.addTodo(document.getElementsByName("taskName")[0])}>Add</button>
                    </form>)}

                    <div id="displayarea" className='mt-3'>
                        <div className='h3 text-center' id='heading'>{this.state.todos.length > 0 ? "List of Todos" : "You have no Todos"}</div>
                        <div className='container text-center'>
                            {listItems}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
