import React, { Component } from 'react';
import axios from 'axios';
import Navbar  from './navbar.component';

export default class CreateCategory extends Component {
    constructor(props){
        super(props)

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: '',
        }
    }

    onChangeCategory(e){
        this.setState ({
            category: e.target.value.toUpperCase(),
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const category = {
            category: this.state.category,
        }
        axios.post('http://localhost:5000/categories/add',category)
        .then(res=>{
            console.log(res.data)
        })
        .catch(error => {
            console.log('Error: ' + error)
        })

        // go back to localhost:3000/create which renders the CreateItem component
        window.location="/create"
    }
    render(){
        return(
            <div>
                <Navbar />
            <div className = "container">
                <h3>Create new category</h3>
                <form onSubmit={this.onSubmit}>
                <div className = "form-group">
                <br />

                <input type="text" className="form-control" 
                value={this.state.category} 
                onChange={this.onChangeCategory}/><br />

                <input type="submit" value="Submit" className="btn btn-primary"/>&nbsp;
                </div>
                </form>
            </div>
            </div>
        )
    }
}