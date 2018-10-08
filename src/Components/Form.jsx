import React, {   Component} from 'react'
import Input from '../Components/Input/Input'
import axios from '../axios';  // set base URL from axios --->
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faWindowClose } from '@fortawesome/free-solid-svg-icons'

library.add(faWindowClose, fas)

class Form extends Component {

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
            },
            video: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: "video/*",
                    name: 'ویدیو'
                },
                value: '',
            },
            audio: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: "audio/*",
                    name: 'فایل صوتی'
                },
                value: '',
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
        successText: '',
        verfy: false,
    }
    componentWillMount(){
        // console.log(this.props.history.location.pathname)
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

        this.setState({orderForm: updatedOrderForm});

    }

    selectHandler = (event, inputIdentifier) => {
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

        this.setState({orderForm: updatedOrderForm});

        if (event.target.name === 'عکس') {
            this.setState({
                image: event.target.files[0] || ''
            })
        } else if (event.target.name === 'ویدیو') {
            this.setState({
                video: event.target.files[0] || ''
            })
        } else if (event.target.name === 'فایل صوتی') {
            this.setState({
                audio: event.target.files[0] || ''
            })
        }
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

    // sent button FUNCTION
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({error: false, success: false})

        var bodyFormData = new FormData();
        bodyFormData.append('title', this.state.orderForm.title.value);
        bodyFormData.append('short_description', this.state.orderForm.short_description.value);
        bodyFormData.append('description', this.state.orderForm.description.value);
        bodyFormData.append('image', this.state.image, this.state.image.name)
        bodyFormData.append('video', this.state.video, this.state.video.name)
        bodyFormData.append('audio', this.state.audio, this.state.audio.name)

        if(this.state.verfy){
            axios({
                method: 'post',
                url: `api/v1/article/${this.state.orderForm.category.value}` ,
                data : bodyFormData,            
                onUploadProgress: progressBar => {
                    let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                    console.log(progressPercent)
                    if (this.state.image.name !== null ||
                        this.state.video.name !== null || 
                        this.state.audio.name !== null || 
                        this.state.orderForm.title.value !== '' || 
                        this.state.orderForm.short_description.value || 
                        this.state.orderForm.description !== '') {
    
                        this.setState({progressPercent: progressPercent})
                    } else{
                        this.setState({progressPercent: null})
                    }
                    (progressPercent !== 100 || progressPercent !== null) ? this.setState({loading: true}) : this.setState({loading: false})
                }
            })
            .then(res => {
                this.setState({
                    success: true,
                    successText: 'عملیات با موفقیت انجام شد',
                    errorText: '',
                    loading: false
                })

                res.status !== 200 ? this.setState({loading: true}) : this.setState({loading: false})
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorText: 'خطا در انجام عملیات، لطفا دوباره امتحان کنید',
                    successText: ' ',
                    loading: false
                })

            })
        }
        
        if(!this.state.verfy){
            this.nameInput.focus();
        }
    
    }


    // verfication CODE Handler
    verficationCodeHandler = (event) => {
        if(event.target.value === '1111' ){
            this.setState({verfy : true })
        }else{
            this.setState({verfy : false })
        }
    }   

    // close success and error MESSAGE WINDOW 
    close = () =>{
        this.setState({error : false , success: false , vefryShow: false })
    }

    render() {
        let errorClass = ['']
        let successClass = ['']
        let verfyClass = ['']

        // --- set class for state of error handeling ---
        if (this.state.error) {
            errorClass = ['errorText']
        } else {
            errorClass = ['hidden']
        }

        if (this.state.success) {
            successClass = ['successClass']
        } else {
            successClass = ['hidden']
        }

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        // --- create form elemnt of main page *Input * Button *Uploader * ... ----
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
                            changed={(event) => {
                                this.selectHandler(event, formElement.id)
                            }}
                        /> : null
                    ))}
                </div>

                <div className="sendVerfy">
                    <button className="sendBtn">ارسال</button>
                    <input type="text" className="verfyInput" 
                           ref={(input) => { this.nameInput = input; }}  
                           placeholder="کد امنیتی"
                           onChange={(event)=>this.verficationCodeHandler(event)} 
                           required/>
                </div>
            </form>


        );
        return (
            <div>
                <div className="container formDiv">
                    <h2 className="formTitle color1">سامانه درج محتوا</h2>
                    {form}
                    <div>
                        {this.state.loading ?
                            <div className="loadingBox">
                                <div className="loader">
                                </div>
                                <div className="loadingPercent">{'% ' + this.state.progressPercent}
                                    <p>منتظر بمانید</p>
                                </div>
                            </div>
                            : ''}
                        {
                            !this.error ? 
                                <div className={errorClass.join(' ')}> {this.state.errorText}
                                    <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close}  />
                                </div> : ''
                        }
                        {
                            !this.success ?
                                <div className={successClass.join(' ')}> {this.state.successText} 
                                    <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
                                </div> : ''
                        }
                        {
                            this.state.verfyShow ?
                            <div className={verfyClass.join(' ')} ref="xx"> کد امنیتی را وارد کنید 
                                <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
                            </div> : ''
                        }
                    </div>
                </div>
            </div>
        )

    }
}

export default Form