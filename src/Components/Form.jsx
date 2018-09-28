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
                        { value: 'one', displayValue: 'یک' },
                        { value: 'two', displayValue: 'دو' },
                        { value: 'three', displayValue: 'سه' },
                        { value: 'four', displayValue: 'چهار' },
                        { value: 'five', displayValue: 'پنج' },
                        { value: 'six', displayValue: 'شش' }
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
        title: 'مشتبی',
        short_description: '',
        description: '',
        image: {
            name: null
        },
        video: {
            name: null
        },
        audio: {
            name: null
        },
        progressPercent : null
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


    fileUpload = () => {
        const fd = new FormData()
        fd.append('image', this.state.image, this.state.image.name)
        fd.append('video', this.state.video, this.state.video.name)
        fd.append('audio', this.state.audio, this.state.audio.name)
        fd.append('title', this.state.title)

        axios.post('api/v1/article/21', fd, {
            onUploadProgress : progressBar => {
                let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                console.log(' UP :  ' +  progressPercent + '%')
                this.setState({progressPercent : progressPercent})
            }
        })
        .then(res => {
                console.log('res ::: ' + res)
            })
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
        console.log(event)

        var bodyFormData = new FormData();
        bodyFormData.append('title', this.state.orderForm.title.value);
        bodyFormData.append('short_description', this.state.orderForm.short_description.value);
        bodyFormData.append('description', this.state.orderForm.description.value);
        bodyFormData.append('image', this.state.image, this.state.image.name)
        bodyFormData.append('video', this.state.video, this.state.video.name)
        bodyFormData.append('audio', this.state.audio, this.state.audio.name)

        axios.post('api/v1/article/21', bodyFormData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log()
            });
    }


    render() {

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
                <div className={'formInputFile'}>
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
                    <h2 className="formTitle color1" >فرم زیر را کامل کنید </h2>
                    {form}
                    <button className="sendBtn" onClick={this.fileUpload}  >{this.state.progressPercent ? '% ' + this.state.progressPercent  : 'بزن داچ'} </button>
                    <button 
                            className="sendBtn" 
                            onClick={this.fileUpload} 
                            style={{
                                'width' : this.state.progressPercent + '%'
                            }}>
                    </button>
                    {this.state.loading ? <div class="loader"></div> : '' }
                    
                    

                    {/* <span className={validationText.join(' ')} >{this.state.emtyField} را پر نکرده اید </span> */}
                </div>
            </div>
        )

    }
}

export default Form