import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component'
import "../App.css";
import CurrencyFormat from 'react-currency-format';

// A component for our select element to be rendered. This is only to keep things modular
// you can return this under render() directly.
const Select = props => {
    return <select className="custom-select"
        defaultValue={props.defaultValue}
        onChange={props.onChangeMonth}>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
        <option>All</option>
    </select>
}

//Another component, this is for computing the income,spendings, and savings
const Compute = props => {
    // get the variables from root in our css
    let savingsStyle = document.documentElement;

    // add to accumulator only if category is not equal to 'INCOME'
    const totalSpending = props.items.reduce((total, item) => {
        return item.category === 'INCOME' ? total : total + item.price
    }, 0);
    
    // add to accumulator if category is equal to 'INCOME'
    let totalIncome = props.items.reduce((total, item) => {
        return item.category === 'INCOME' ? total + item.price : total
    }, 0)

    const savings = totalIncome - totalSpending;

    // a conditional statement that will change a variable in css, that 
    // will make our savings turn red or green based on the result.
    if (savings > 0) {
        savingsStyle.style.setProperty('--savings-color', 'green')
    } else {
        savingsStyle.style.setProperty('--savings-color', 'red')

    }

    // assign each formatted values to a variable
    const elementIncome = (
        <span>
            <span id="income">Income:</span><span id="incomeNumber">{<CurrencyFormat value={totalIncome}
                displayType={'text'} thousandSeparator={true} prefix={'₱'} />}</span></span>
    )
    const elementSpending = (
        <span>
            <span id="spending">Spendings:</span><span id="spendingNumber">{<CurrencyFormat value={totalSpending}
                displayType={'text'} thousandSeparator={true} prefix={'₱'} />}</span></span>
    )
    const elementSavings = (

        <span id="savingsStyle">Savings: {<CurrencyFormat value={savings}
            displayType={'text'} thousandSeparator={true} prefix={'₱'} />}</span>
    )

    //Organize how each element will look like
    const element = (

        <div>
            <p>{elementIncome}{elementSpending}</p><br /><p>{elementSavings}</p>
        </div>



    );
    return element;


}

// component for showing the item list in tables
const Item = props => {

    // if category is income the table row will turn green, default is red
    let rowStyle = "table-danger"
    if (props.item.category === "INCOME") {
        rowStyle = "table-success"
    }
    return <tr className={rowStyle}>
        <td>{props.item.category}</td>
        <td>{props.item.description}</td>
        <td>{<CurrencyFormat value={props.item.price} displayType={'text'} thousandSeparator={true} prefix={'₱'} />}</td>
        {/* Need to cut some from date because it has timestamp and timezone */}
        <td>{props.item.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.item._id}>Edit</Link>&nbsp; | &nbsp;
            <Link to='/' id="delete" onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?"))
                    props.deleteItem(props.item._id)
            }}>Delete</Link>
        </td>
    </tr>
}

export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);

        this.state = {
            // unfilteredItems will be the container for our items, then items array will get data from there,
            // otherwise, data will come from items array that is already filtered by month
            items: [],
            month: 'All',
            unfilteredItems: [],
            category: 'INCOME'
        };
    }

    componentDidMount() {
        // chain it with a promise so as soon the page loads it will already show a list
        axios.get('http://localhost:5000/items/')
            .then(res => {
                this.setState({
                    unfilteredItems: res.data,
                })
            }).then(() => {
                this.determineMonth()
            })
            .catch(error => {
                console.log('Error: ' + error);
            })
            //for adding income to categories when the user first uses the app
            const category = {
                category: this.state.category
            }
            axios.post('http://localhost:5000/categories/add',category)

    }


    deleteItem(id) {
        axios.delete('http://localhost:5000/items/' + id)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
        //filter items where id is not equal to the id we're deleting, so that it will not show in the table anymore
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        });
    }

    onChangeMonth(e) {
        // chain it with a promise that will execute determineMonth() after the state has changed in order to
        // show the list immediately based on the month chosen, otherwise, the one the user picked will 
        // be shown after the next change of month, resulting in inaccuracy
        this.setState({
            month: e.target.value,
        }, () => {
            this.determineMonth();
        });

    }

    // a classic switch statement for months :D, this assigns the value of items array based on the filtered
    // result of unfilteredItems array
    determineMonth(e) {
        switch (this.state.month) {
            case 'January':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '01')
                })
                break;
            case 'February':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '02')
                })
                break;
            case 'March':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '03')
                })
                break;
            case 'April':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '04')
                })
                break;
            case 'May':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '05')
                })
                break;
            case 'June':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '06')
                })
                break;
            case 'July':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '07')
                })
                break;
            case 'August':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '08')
                })
                break;
            case 'September':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '09')
                })
                break;
            case 'October':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '10')
                })
                break;
            case 'November':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '11')
                })
                break;
            case 'December':
                this.setState({
                    items: this.state.unfilteredItems.filter(item => item.date.substring(5, 7) === '12')
                })
                break;

            default:
                this.setState({
                    items: this.state.unfilteredItems
                })
                break;
        }
    };

    //supply the necessary props for Item component
    itemList() {
        return this.state.items.map(currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem}
                key={currentitem._id} />
        })
    };

    //supply the necessary props for Compute component
    showCompute() {
        return <Compute items={this.state.items} />
    };


    render() {
        return (
            <div>
                {/* render the Navbar component and pass the Select component as its props */}
                <Navbar select={<Select defaultValue={this.state.month} onChangeMonth={this.onChangeMonth} />} />
                <table className="table table-sm">
                    <thead className="thead-dark">

                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
                {this.showCompute()}


            </div>
        )
    }
}

