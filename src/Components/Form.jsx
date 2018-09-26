import React , {Component} from 'react'
import Input from '../Components/Input/Input'



class Form extends Component {
    
    state = {
        orderForm: {
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'one', displayValue: 'یک'},
                        {value: 'two', displayValue: 'دو'},
                        {value: 'three', displayValue: 'سه'},
                        {value: 'four', displayValue: 'چهار'},
                        {value: 'five', displayValue: 'پنج'},
                        {value: 'six', displayValue: 'شش'}
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
            shortDesc: {
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
            Description: {
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
                    accept:"image/*",
                    name:'عکس'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            video: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept:"video/*",
                    name:'ویدیو'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            music: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept:"audio/*",
                    name:'آهنگ'
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
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
    orderHandler = ( event ) => {

        event.preventDefault();
            
        
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
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                            ))}

                    <button className="sendBtn" >ارسال </button>
                </form>
            );
        return (
            <div>
                <div className="container formDiv" >
                    <h2 className="formTitle color1" >فرم زیر را کامل کنید </h2>
                    {form}
                    {/* <span className={validationText.join(' ')} >{this.state.emtyField} را پر نکرده اید </span> */}
                </div>
            </div>
        )

    }
}

export default Form