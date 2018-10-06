import React, {Component} from 'react'
import Input from '../Components/Input/Input'
import axios from '../axios';  // set base URL from axios --->
import Navbar from './Navbar'
import Footer from './Footer'
import DataBox from './DataBox/DataBox'

class EditData extends Component {
    state = {
        orderForm: {
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '1', displayValue: 'تاریخ دفاع مقدس'},
                        {value: '2', displayValue: 'عملیات ها'},
                        {value: '3', displayValue: 'سرداران دفاع مقدس'},
                        {value: '4', displayValue: 'ستاد مشترک دفاع مقدس'},
                        {value: '5', displayValue: 'دفاع مقدس در آیینه هنر'},
                        {value: '6', displayValue: 'دستاورد های دفاع مقدس'},
                        {value: '7', displayValue: 'ناگفته های دفاع مقدس'},
                        {value: '8', displayValue: 'جغرافیا دفاع مقدس'},
                        {value: '9', displayValue: 'نقش مردم در دفاع مقدس'},
                        {value: '10', displayValue: 'بانک مقالات و پایان نامه ها'},
                        {value: '11', displayValue: 'آزادگان و جانبازان'},
                        {value: '12', displayValue: 'گاه شمار دفاع مقدس'},
                    ]
                },
                value: '1',
                validation: {},
                valid: true
            }
        },
        myData:[],
        
        selectedId: 1,
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJhZ2VudCI6ImFuZHJvaWQifQ.xBi4wSpZrzZgJ0WvUj92uGaZ_quWKYcSWlPs2afZ_Zw'

    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'api/v1/article/' + this.state.selectedId ,
            headers: { 
                "Authorization": this.state.token,
                "Accept":"application/json", 
            },
        })
        .then(res =>{
            this.setState({myData : res.data.data})
            // console.log('data' , this.state.myData)
        })
    }

    


    // select title from select option
    selectHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});

        console.log(event.target.value)
        this.setState({selectedId : event.target.value})
        axios({
            method: 'get',
            url: 'api/v1/article/' + this.state.selectedId ,
            headers: { 
                
                "Authorization": this.state.token,
                "Accept":"application/json", 
            },
        })
        .then(res =>{
            this.setState({myData : res.data.data})
            // console.log('data' , this.state.myData)
        })
    }

    // DELETE data 
    dataDeleteHandler = () =>{

    }

    // EDIT data
    dataEditHandler = () =>{

    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let selectBox = <div>
                            {formElementsArray.map(formElement => (
                                formElement.config.elementType !== 'file' ? <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    changed={(event) => this.selectHandler(event, formElement.id)}
                                /> : null
                    ))}
                        </div>


        const myDataArray = []
        for (let key in this.state.myData) {
            myDataArray.push({
                id: key,
                data: this.state.myData[key]
            });
        }
        const myDataShow = <div>
                        {myDataArray.map(dataElement =>(
                             <DataBox 
                                key={dataElement.id}
                                title={dataElement.data.title}
                                short_description={dataElement.data.short_description}
                                description={dataElement.data.description}
                                image={dataElement.data.image}
                                video={dataElement.data.video}
                                audio={dataElement.data.audio}
                                dataId={dataElement.data.id}
                                selectedId={this.state.selectedId}
                                dataDeleteHandler={this.dataDeleteHandler()}
                                dataEditHandler={this.dataEditHandler}
                             />
                        ))}
        </div>
        
        return (
            
            <div>

                <Navbar />
                <div className="dataSelect">
                    {selectBox}
                    {this.state.selectedId}
                </div>
                <div>
                    {myDataShow}
                </div>

                <Footer />
            </div>
        )
    }
}

export default EditData