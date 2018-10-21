import React, { Component } from 'react'
import axios from '../axios';  // set base URL from axios --->
import Footer from './Footer';
import Navbar from './Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faMusic, faImage, faFileVideo, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

library.add(faMusic, fas, faImage, faFileVideo, faWindowClose, fas)

class EditPage extends Component {

    state = {
        formIsValid: false,
        loading: false,
        progressPercent: null,
        error: false,
        errorText: '',
        success: false,
        successText: '',
        title: '',
        short_description: '',
        description: '',
        image: '',
        video: '',
        audio: '',
        catId: null,
        id: null
    }

    constructor(props){
        super(props)
        this.updateContent = this.updateContent.bind(this)
    }

    componentWillMount() {
        const myState = this.props.history.location.state
        this.setState({
            title: myState.title,
            short_description: myState.short_description,
            description: myState.description,
            image: myState.image,
            video: myState.video,
            audio: myState.audio,
            catId: myState.catId,
            id: myState.id
        })
    }
    componentDidMount() {
        this.title.value = this.state.title
        this.short_description.value = this.state.short_description
        this.description.value =  this.state.description 
        this.image = ' ' || this.state.image
        this.video = ' ' || this.state.video
        this.audio = ' ' || this.state.audio
    }



    // sent button FUNCTION
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ error: false, success: false })

        var bodyFormData = new FormData();
        bodyFormData.append('title', this.title.value);
        bodyFormData.append('short_description', this.short_description.value);
        bodyFormData.append('description', this.state.description);
        bodyFormData.append('image', this.state.image, this.state.image)
        bodyFormData.append('video', this.state.video, this.state.video)
        bodyFormData.append('audio', this.state.audio, this.state.audio)


        axios({
            method: 'post',
            url: `/api/v1/article/${this.state.catId}/update/${this.state.id}`,
            data: bodyFormData,
            onUploadProgress: progressBar => {
                let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                if (this.state.image.name !== null ||
                    this.state.video.name !== null ||
                    this.state.audio.name !== null ||
                    this.state.title !== '' ||
                    this.state.short_description ||
                    this.state.description !== '') {
                    this.setState({ progressPercent: progressPercent })
                } else {
                    this.setState({ progressPercent: null })
                }
                (progressPercent !== 100 || progressPercent !== null) ? this.setState({ loading: true }) : this.setState({ loading: false })
            }
        })
            .then(res => {
                this.setState({
                    success: true,
                    successText: 'عملیات با موفقیت انجام شد',
                    errorText: '',
                    loading: false
                })
                res.status !== 200 ? this.setState({ loading: true }) : this.setState({ loading: false })
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

    // EDITOR  
    updateContent = (value) => {
        this.setState({ description: value })
    }
    jodit;
    setRef = jodit => this.jodit = jodit;

    config = {
        readonly: false , // all options from https://xdsoft.net/jodit/doc/
        showPlaceholder: false,
        showWordsCounter:false,
        showCharsCounter: false

    }


    // close success and error MESSAGE WINDOW 
    close = () => {
        this.setState({ error: false, success: false, vefryShow: false })
    }

    changeImage = (e) => {
        this.setState({ image: e.target.files[0] })
    }
    changeVideo = (e) => {
        this.setState({ video: e.target.files[0] })
    }
    changeAudio = (e) => {
        this.setState({ audio: e.target.files[0] })
    }

    render() {
        let errorClass = ['']
        let successClass = ['']
        let messageBoxErr = ['']
        let messageBoxScc = ['']

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
            messageBoxScc = ['hiden']
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
                    <input type="text"  maxLength="110" className="InputElement margin20" placeholder="عنوان" ref={(title) => { this.title = title }} />
                    <input type="text"  maxLength="110" className="InputElement margin20" placeholder="توضیح کوتاه " ref={(short_description) => { this.short_description = short_description }} />
                    <div style={{ width: '80%', margin: '0px auto 10px' }} >
                        <JoditEditor
                            ref={(description) => { this.description = description }}
                            editorRef={this.setRef}
                            value={this.state.description}
                            config={this.config}
                            onChange={this.updateContent}
                        />

                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon">
                                <FontAwesomeIcon className="DLIcon" icon={faImage} />
                            </span>
                            <span>انتخاب عکس</span>
                            <input className={'fileInputField '} type="file" name="عکس" accept='image/*' onChange={this.changeImage} ref={(image) => { this.image = image }} />
                        </div>
                        <a target="_blank" className="play" href={this.state.image} >نمایش عکس</a>
                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon">
                                <FontAwesomeIcon className="DLIcon" icon={faFileVideo} />
                            </span>
                            <span>انتخاب ویدیو</span>
                            <input className={'fileInputField '} type="file" name="ویدیو" accept='video/*' onChange={this.changeVideo} ref={(video) => { this.video = video }} />
                        </div>
                        <a target="_blank" className="play" href={this.state.video} >پخش فایل ویدیویی</a>
                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon">
                                <FontAwesomeIcon className="DLIcon" icon={faMusic} />
                            </span>
                            <span>انتخاب فایل صوتی</span>
                            <input className={'fileInputField '} type="file" name="فایل صوتی" accept='audio/*' onChange={this.changeAudio} ref={(audio) => { this.audio = audio }} />
                        </div>
                        <a target="_blank" className="play" href={this.state.audio} >پخش فایل صوتی</a>
                    </div>
                </div>

                <div className="sendVerfy">
                    <button className="sendBtn">ارسال</button>
                </div>
            </form>


        );
        return (
            <div>

                <Navbar />
                <div className="container formDiv">
                    <h2 className="formTitle color1">ویرایش محتوا</h2>
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
                    </div>
                </div>
                <Footer />
            </div>
        )

    }
}

export default EditPage