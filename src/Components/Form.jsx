import React, { Component } from 'react'
import Input from '../Components/Input/Input'
import axios from '../axios';  // set base URL from axios --->
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import CKEditor from "react-ckeditor-component";


library.add(faWindowClose, fas)

const initialState = {
    orderForm: {
        category: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '1', displayValue: 'تاریخ دفاع مقدس' },
                    { value: '2', displayValue: 'عملیات ها' },
                    { value: '3', displayValue: 'سرداران دفاع مقدس' },
                    { value: '4', displayValue: 'دانستنی های  دفاع مقدس' },
                    { value: '5', displayValue: 'دفاع مقدس در آیینه هنر' },
                    { value: '6', displayValue: 'دستاورد های دفاع مقدس' },
                    { value: '7', displayValue: 'ناگفته های دفاع مقدس' },
                    { value: '8', displayValue: 'جغرافیا دفاع مقدس' },
                    { value: '9', displayValue: 'نقش مردم در دفاع مقدس' },
                    { value: '10', displayValue: 'بانک مقالات و پایان نامه ها' },
                    { value: '11', displayValue: 'آزادگان و جانبازان' },
                    { value: '12', displayValue: 'گاه شمار دفاع مقدس' },
                    { value: '13', displayValue: '   سروده ها و آواهای دفاع مقدس' }
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
                accept: "video/mp4",
                name: 'ویدیو'
            },
            value: '',
        },
        audio: {
            elementType: 'file',
            elementConfig: {
                type: 'file',
                accept: "audio/mp3",
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
    resetFormValue: '',
    content: '',
}

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
        resetFormValue: '',
        content: '',
        imageOverSize: false,
        imageOverSizeTxt: ''
    }

    constructor() {
        super();
        this.state = initialState
        this.updateContent = this.updateContent.bind(this);
        this.onChange = this.onChange.bind(this);
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

    ckChangeHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ content: data })
    }

    selectHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };



        if (event.target.name === 'عکس') {
            if (event.target.files[0].size < 512000) {
                this.setState({
                    image: event.target.files[0] || '', imageOverSize: false
                })
                updatedFormElement.value = event.target.value;

            } else {
                this.setState({
                    image: '', imageOverSize: true, imageOverSizeTxt: 'حجم عکس باید کمتر از 500 کیلوبایت باشد'
                })
                updatedFormElement.value = this.state.orderForm.image.value
            }


        } else if (event.target.name === 'ویدیو') {
            this.setState({
                video: event.target.files[0] || ''
            })
            updatedFormElement.value = event.target.value;

        } else if (event.target.name === 'فایل صوتی') {
            this.setState({
                audio: event.target.files[0] || ''
            })
            updatedFormElement.value = event.target.value;

        }
        // updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });

    }


    // console.log(event.target)
    // let jasper = Object.assign({}, this.state.orderForm.image);  
    // jasper.value = 'اندازه تصویر بزرگ است';           
    // this.setState({ jasper });
    // console.log(this.state.orderForm.image)

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
        this.setState({ error: false, success: false })

        var bodyFormData = new FormData();
        bodyFormData.append('title', this.state.orderForm.title.value);
        bodyFormData.append('short_description', this.state.orderForm.short_description.value);
        bodyFormData.append('description', this.state.content);
        bodyFormData.append('image', this.state.image, this.state.image.name)
        bodyFormData.append('video', this.state.video, this.state.video.name)
        bodyFormData.append('audio', this.state.audio, this.state.audio.name)

        axios({
            method: 'post',
            url: `api/v1/article/${this.state.orderForm.category.value}`,
            data: bodyFormData,
            onUploadProgress: progressBar => {
                let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                if (this.state.image.name !== null ||
                    this.state.video.name !== null ||
                    this.state.audio.name !== null ||
                    this.state.orderForm.title.value !== '' ||
                    this.state.orderForm.short_description.value ||
                    this.state.orderForm.description !== '') {

                    this.setState({ progressPercent: progressPercent })
                } else {
                    this.setState({ progressPercent: null })
                }

                (progressPercent !== 100 || progressPercent !== null) ? this.setState({ loading: true }) : this.setState({ loading: false })
            }
        })
            .then(res => {

                // res.status !== 200 ? this.setState({ loading: true }) : this.setState({ loading: false })

                if (res.status !== 200) {
                    this.setState({ loading: true })
                } else {
                    this.setState({
                        ...initialState,
                        success: true,
                        successText: 'عملیات با موفقیت انجام شد',
                        errorText: '',
                        loading: false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorText: 'خطا در انجام عملیات، لطفا دوباره امتحان کنید',
                    successText: ' ',
                    loading: false
                })
            })


        event.target.value = ''


    }

    // close success and error MESSAGE WINDOW 
    close = () => {
        this.setState({ error: false, success: false, vefryShow: false, imageOverSize: false })
    }


    // CKEditor =============
    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onChange(evt) {
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }

    onBlur(evt) {
    }

    afterPaste(evt) {
    }



    render() {
        let errorClass = ['']
        let successClass = ['']
        let messageBoxErr = ['']
        let messageBoxScc = ['']
        let imageOverClass = ['']
        let messageImageOver = ['']


        // --- set class for state of error handeling ---
        if (this.state.error) {
            errorClass = ['errorText']
            messageBoxErr = ['messageBoxErr']
        } else {
            errorClass = ['hidden']
            messageBoxErr = ['hidden']
        }

        if (this.state.success) {
            successClass = ['successClass']
            messageBoxScc = ['messageBoxScc']
        } else {
            successClass = ['hidden']
            messageBoxScc = ['hidden']
        }


        if (this.state.imageOverSize) {
            imageOverClass = ['errorText']
            messageImageOver = ['messageBoxErr']
        } else {
            imageOverClass = ['hidden']
            messageImageOver = ['hidden']
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
                <div style={{ width: '80%', margin: '0px auto 10px' }} >

                </div>
                <div style={{ width: '80%', margin: '0px auto 10px' }}>
                    <CKEditor
                        activeClass="p10"
                        content={this.state.content}
                        events={{
                            "blur": this.onBlur,
                            "afterPaste": this.afterPaste,
                            "change": this.onChange
                        }}
                        config={{
                            contentsLangDirection: 'rtl'
                        }}
                    />

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
                </div>
            </form>


        );
        return (
            <div>
                <div className="container formDiv">
                    <h2 className="formTitle color1">سامانه درج محتوا</h2>
                    {form}
                    <div >
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
                                <div className={messageBoxErr.join(' ')}>
                                    <div className={errorClass.join(' ')}> {this.state.errorText}
                                        <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
                                    </div>
                                </div> : ''
                        }
                        {
                            !this.success ?
                                <div className={messageBoxScc.join(' ')}>
                                    <div className={successClass.join(' ')}> {this.state.successText}
                                        <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
                                    </div>
                                </div> : ''
                        }
                        {
                            this.state.imageOverSize ?
                                <div className={messageImageOver.join(' ')}>
                                    <div className={imageOverClass.join(' ')}> {this.state.imageOverSizeTxt}
                                        <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
                                    </div>
                                </div> : ''
                        }
                    </div>
                </div>
            </div>
        )

    }
}

export default Form