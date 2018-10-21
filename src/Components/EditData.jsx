import React, { Component } from 'react'
import Input from '../Components/Input/Input'
import axios from '../axios';  // set base URL from axios --->
import Navbar from './Navbar'
import Footer from './Footer'
import DataBox from './DataBox/DataBox'
import { confirmAlert } from 'react-confirm-alert'; // Import


class EditData extends Component {
    state = {
        orderForm: {
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '1', displayValue: 'تاریخ دفاع مقدس' },
                        { value: '2', displayValue: 'عملیات ها' },
                        { value: '3', displayValue: 'سرداران دفاع مقدس' },
                        { value: '4', displayValue: 'ستاد مشترک دفاع مقدس' },
                        { value: '5', displayValue: 'دفاع مقدس در آیینه هنر' },
                        { value: '6', displayValue: 'دستاورد های دفاع مقدس' },
                        { value: '7', displayValue: 'ناگفته های دفاع مقدس' },
                        { value: '8', displayValue: 'جغرافیا دفاع مقدس' },
                        { value: '9', displayValue: 'نقش مردم در دفاع مقدس' },
                        { value: '10', displayValue: 'بانک مقالات و پایان نامه ها' },
                        { value: '11', displayValue: 'آزادگان و جانبازان' },
                        { value: '12', displayValue: 'گاه شمار دفاع مقدس' },
                    ]
                },
                value: '1',
            }
        },
        myData: [],
        title: '',
        short_description: '',
        description: '',
        image: '',
        video: '',
        audio: '',
        selectedId: 1,
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJhZ2VudCI6ImFuZHJvaWQifQ.xBi4wSpZrzZgJ0WvUj92uGaZ_quWKYcSWlPs2afZ_Zw',
        loading: true,
        edit: false,
    }

    componentDidUpdate() {
        if (this.state.loading) {

            axios({
                method: 'get',
                url: 'api/v1/article/admin/' + this.state.selectedId,
                headers: {
                    "Authorization": this.state.token,
                    "Accept": "application/json",
                },
            })
                .then(res => {
                    this.setState({ myData: res.data.data, loading: false })
                })
        }
    }


    // select title from select option
    selectHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.value = event.target.value;
        this.setState({ orderForm: updatedOrderForm, selectedId: event.target.value, loading: true });
    }

    // select option CLICKED
    clickedValue = () => {
        if (this.state.loading) {
            axios({
                method: 'get',
                url: 'api/v1/article/admin/' + this.state.selectedId,
                headers: {
                    "Accept": "application/json",
                },
            })
                .then(res => {
                    this.setState({ myData: res.data.data, loading: false })
                })
        }

    }

    // DELETE data 
    deleteDataHandler = (e, id, catId) => {

        confirmAlert({
            message: 'آیا میخواهید این اطلاعات را حذف کنید ؟',
            buttons: [
                {
                    label: 'بله',
                    onClick: () => {
                        this.setState({ loading: true })
                        if (!this.state.loading) {

                            axios({
                                method: 'delete',
                                url: `api/v1/article/${catId}/delete/${id}`,
                                headers: {
                                    "Authorization": this.state.token,
                                    "Accept": "application/json",
                                },
                            })
                                .then(res => {
                                    this.setState({ myData: res.data.data, loading: false })
                                })
                        }
                    }
                },
                {
                    label: 'انصراف',
                    onClick: () => {

                    }
                }
            ]
        })

    }

    // EDIT data
    editDataHandler = (e, id, catId, title, short_description, description, image, video, audio) => {
        this.setState({
            title: title,
            short_description: short_description,
            description: description,
            image: image,
            video: video,
            audio: audio
        })

        this.setState({ edit: true })
        this.props.history.push({
            pathname: '/edit-data/' + catId + '/' + id,
            state:
            {
                title: title,
                short_description: short_description,
                description: description,
                image: image,
                video: video,
                audio: audio,
                catId: catId,
                id: id
            }
        }
        )
    }

    
    verficationCodeHandler = (event) => {
        if (event.target.value === '914825') {
            this.setState({ verfy: true })
        } else {
            this.setState({ verfy: false })
        }
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
                    clicked={this.clickedValue()}
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
            {myDataArray.map(dataElement => (
                <DataBox
                    key={dataElement.id}
                    catId={dataElement.data.cat_id}
                    title={dataElement.data.title}
                    short_description={dataElement.data.short_description}
                    description={dataElement.data.description}
                    image={dataElement.data.image}
                    video={dataElement.data.video}
                    audio={dataElement.data.audio}
                    dataId={dataElement.data.id}
                    selectedId={this.state.selectedId}
                    deleteData={(e) => this.deleteDataHandler(e, dataElement.data.id, dataElement.data.cat_id)}
                    editData={(e) => this.editDataHandler(e, dataElement.data.id,
                        dataElement.data.cat_id,
                        dataElement.data.title,
                        dataElement.data.short_description,
                        dataElement.data.description,
                        dataElement.data.image,
                        dataElement.data.video,
                        dataElement.data.audio
                    )}
                />
            ))}
        </div>

        return (

            <div>
                <Navbar />
                <div className="dataSelect">
                    {selectBox}
                    {/* {this.state.selectedId} */}
                </div>
                <div>
                    {myDataShow}
                </div>
                {this.state.loading ?
                    <div className="loadingBox">
                        <div className="loader">
                        </div>
                        <div className="loadingPercent">
                            <p>منتظر بمانید</p>
                        </div>
                    </div>
                    : ''}
                <Footer />
            </div>
        )
    }
}

export default EditData