import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Navbar  from './navbar.component';


export default class CreateItem extends Component {
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
            price: '',
            date: new Date(),
            categories: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/categories')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    // insert the data that is received from the axios get request
                    // to categories array, so the user can choose from the
                    // the existing categories.
                    categories: response.data.map(category => category.category),
                    // make the first index in the array the default value for category,
                    // the user may tend to not click the selected in the option making the value to null
                    category: response.data[0].category
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
            description: e.target.value,

        })
    }

    
    onChangePrice(e) {
        this.setState ({
            price: e.target.value
        })
    }
    
    
    onChangeDate(date) {
        this.setState ({
            date: date,
           
            
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
        axios.post('http://localhost:5000/items/add',item)
        .then(res => {
            console.log(res.data)
        })
        // go back to localhost:3000/ which renders the ItemList component
        window.location ="/"
    }

    render(){
        return(
            <div>
            {/* render the Navbar component */}
            <Navbar/>
            <div className="container">
              <h3> Create new item</h3>
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
                <Link to="/create/category">Create new category</Link>

                  </div>
                    <div className="form-group">
                        <label>Price:</label>
                        {/* use the react-currency-format to format the user input to
                        make it easier for them to read it while supplying the details */}
                        <CurrencyFormat
                        thousandSeparator={true} 
                        className="form-control"
                        onValueChange={(values) => {
                            const {formattedValue} = values;
                            // because we formatted the user input, E.g. "1,000" It has a ',' 
                            // making it a bad request when sent to the database.
                            // So we split it first by ',' then join it with "" only,
                            // this makes the array values from split to just concatinate
                            // without any additional characters, so it's back to "1000"
                            this.setState({price: formattedValue.split(",").join("")})
                          }}/>
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
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
              </form>
            </div>
            </div>
        )
    }
}