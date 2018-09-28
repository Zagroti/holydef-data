import React, { Component } from 'react'
import Input from '../Components/Input/Input'
import axios from '../axios';



class Form extends Component {

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
                value: '',
                validation: {},
                valid: true
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'عنوان'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            short_description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'توضیح کوتاه'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'توضیحات بلند'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: "image/*",
                    name: 'عکس'
                },
                value: '',
                binaty: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            video: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: "video/*",
                    name: 'ویدیو'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            audio: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: "audio/*",
                    name: 'فایل صوتی'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
        },
        formIsValid: false,
        loading: false,
        image: {
            name: null
        },
        video: {
            name: null
        },
        audio: {
            name: null
        },
        progressPercent: null,
        error: false,
        errorText: '',
        success: false,
        successText: ''
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({ orderForm: updatedOrderForm });

    }
    inputChangedHandlerFile = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({ orderForm: updatedOrderForm });
    }


    selectHandler = event => {
        console.log(event.target)

        if (event.target.name === 'عکس') {
            this.setState({
                image: event.target.files[0]
            })
        } else if (event.target.name === 'ویدیو') {
            this.setState({
                video: event.target.files[0]
            })
        } else if (event.target.name === 'فایل صوتی') {
            this.setState({
                audio: event.target.files[0]
            })
        }
        console.log(this.state)
    }



    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        
        var bodyFormData = new FormData();
        bodyFormData.append('title', this.state.orderForm.title.value);
        bodyFormData.append('short_description', this.state.orderForm.short_description.value);
        bodyFormData.append('description', this.state.orderForm.description.value);
        bodyFormData.append('image', this.state.image, this.state.image.name)
        bodyFormData.append('video', this.state.video, this.state.video.name)
        bodyFormData.append('audio', this.state.audio, this.state.audio.name)

        axios.post('api/v1/article/25', bodyFormData, {
            onUploadProgress: progressBar => {
                let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                console.log(progressBar)
                if (this.state.image.name !== null || this.state.video.name !== null || this.state.audio.name !== null) {
                    this.setState({ progressPercent: progressPercent })
                } else {
                    this.setState({ progressPercent: null })
                }
                progressPercent !== 100 || progressPercent === null ? this.setState({ loading: true }) : this.setState({ loading: false })
            }
        })
            .then(res => {
                this.setState({ success: true, successText: 'تکمیل عملیات ' })
                res.status !== 200 ? this.setState({ loading: true }) : this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ error: true, errorText: 'دوباره امتحان کنید ' })

            })
        console.log(this.state)
    }


    render() {
        let errorClass = ['']
        let successClass = ['']
        if (this.state.error) {
            errorClass = ['errorText']
        }else{
            errorClass = ['hidden']
        }
        if(this.state.success){
            successClass =['successClass']
        }else{
            successClass =['hidden']
        }
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                <div>
                    {formElementsArray.map(formElement => (
                        formElement.config.elementType !== 'file' ? <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        /> : null
                    ))}
                </div>
                <div className={'formInputFile '}>
                    {formElementsArray.map(formElement => (
                        formElement.config.elementType === 'file' ? <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={this.selectHandler}
                        /> : null
                    ))}
                </div>


                <button className="sendBtn" >ارسال </button>
            </form>


        );
        return (
            <div>
                <div className="container formDiv" >
                    <h2 className="formTitle color1" >سامانه درج محتوا</h2>
                    {form}
                    <div>
                        {this.state.loading ?
                            <div className="loadingBox" >
                                <div className="loader">
                                </div>
                                <div className="loadingPercent" >{'% ' + this.state.progressPercent}
                                    <p>منتظر بمانید</p>
                                </div>

                            </div>
                            : ''}
                        {
                            !this.error ? <div className={errorClass.join(' ')} > {this.state.errorText}  </div> : ''
                        }
                        {
                            !this.success ? <div className={successClass.join(' ')} > {this.state.successText}  </div> : ''
                        }
                    </div>



                    {/* <span className={validationText.join(' ')} >{this.state.emtyField} را پر نکرده اید </span> */}
                </div>
            </div>
        )

    }
}

export default Form