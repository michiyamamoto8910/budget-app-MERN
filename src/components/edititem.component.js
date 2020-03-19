import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditItem extends Component {
    constructor(props){
        super(props)

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: '',
            description: '',
            price: 0,
            date: new Date(),
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                category: res.data.category,
                description: res.data.description,
                price: res.data.price,
                date: new Date(res.data.date)
            })
        })
        .catch(err => {
            console.log('Error: '+err)
        })

        axios.get('http://localhost:5000/categories')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    categories: response.data.map(category => category.category), 
                })
            }
        })
        
    }
    onChangeCategory(e) {
        this.setState  ({
            category: e.target.value
        })
    }

    
    onChangeDescription(e) {
        this.setState ({
            description: e.target.value
        })
    }

    
    onChangePrice(e) {
        this.setState ({
            price: e.target.value
        })
    }
    
    
    onChangeDate(date) {
        this.setState ({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            date: this.state.date,
        }
        console.log(item);
        axios.post('http://localhost:5000/items/update/'+this.props.match.params.id,item)
        .then(res => {
            console.log(res.data)
        })

        window.location = '/';
    }

    render(){
        return(
            <div className="container">
              <h3> Edit item </h3>
              <form onSubmit = {this.onSubmit}>
                  <div className = "form-group">
                    <label>Category: </label>
                    <select ref = "userInput"
                    required
                    className="form-control"
                    value={this.state.category}
                    onChange={this.onChangeCategory}>
                    {
                        this.state.categories.map((category) => {
                            return <option
                                key={category}
                                value={category}>{category}
                            </option>;
                        })
                    }
                    </select>
                  </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input 
                        type="number"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" 
                    value={this.state.description} 
                    onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                    <label>Date:</label>
                    <br/>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        
                    />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Item log" className="btn btn-primary"/>
                    </div>
              </form>
            </div>
        )
    }
}