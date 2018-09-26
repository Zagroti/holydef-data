import React from 'react';


const input = ( props ) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];
    const inputClassesFile = [''];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
                required/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
                required/>;
            break;
        case ( 'file' ):
            inputElement = 
            <div className={ props.invalid ? 'fileInput' : 'fileInputٰValid' } >
                {props.value ? props.value : <span>{props.elementConfig.name}  مورد نظر را انتخاب کنید</span> } 
                <input
                    className={'fileInputField'}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    required />
            </div>
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={'Input'}>
            <label className={'Label'}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;