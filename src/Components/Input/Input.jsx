import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faImage,faVideo, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faImage,faVideo, faVolumeUp )

const input = (props) => {
    let inputElement = null;
    let inputElementFile = null
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required 
                maxLength="110"
                />;
            break;
        // case ('textarea'):
        //     inputElement = <textarea
        //         className={inputClasses.join(' ')}
        //         {...props.elementConfig}
        //         value={props.value}
        //         onChange={props.changed}
        //          />;
        //     break;

        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    onClick={props.clicked}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = null
    }
    let myIcon = null;
    if (props.elementConfig.name === 'فایل صوتی') {
        myIcon = faVolumeUp;
    } else if (props.elementConfig.name === 'ویدیو') {
        myIcon = faVideo;
    } else {
        myIcon = faImage;
    }
    if (props.elementType === 'file') {
        inputElementFile =
            <div className={'fileInput'} >
                {props.value ? props.value :
                    <span className="myIcon xicon">
                        <FontAwesomeIcon className="DLIcon" icon={myIcon} />
                        {props.elementConfig.name}
                    </span>
                }
                <input
                    className={'fileInputField'}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            </div>
    }
    return (
        <div >


            {props.elementType !== 'file' ?
                <div className={'Input'}>
                    {inputElement}
                </div> :

                <div className={'InputFile'}>
                    {inputElementFile}
                </div>
            }


        </div>
    );

};

export default input;