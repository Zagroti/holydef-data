import React, { Component } from 'react'
import axios from '../axios';  // set base URL from axios --->
import Footer from './Footer';
import Navbar from './Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faImage, faWindowClose, faVideo, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import CKEditor from "react-ckeditor-component";
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';


library.add(fas, faImage, faWindowClose, fas, faVideo, faVolumeUp)

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
        id: null,
        imageOverSize: false,
        imageOverSizeTxt: ''
    }

    constructor(props) {
        super(props)
        this.updateContent = this.updateContent.bind(this)
        this.onChange = this.onChange.bind(this)
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
        this.description.value = this.state.description
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

                if (res.status !== 200) {
                    this.setState({ loading: true })
                } else {
                    this.setState({ loading: false })
                    this.props.history.push('/edit-data')
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


    }

    // CKEditor =============
    updateContent(newContent) {
        this.setState({
            description: newContent
        })
    }

    onChange(evt) {
        var newContent = evt.editor.getData();
        this.setState({
            description: newContent
        })
    }

    onBlur(evt) {
    }

    afterPaste(evt) {
    }

    // close success and error MESSAGE WINDOW 
    close = () => {
        this.setState({ error: false, success: false, vefryShow: false  , imageOverSize:false})
    }

    changeImage = (e) => {
        if(e.target.files[0].size < 512000){
            this.setState({ image: e.target.files[0] ,  imageOverSize: false })
        }else{
            this.setState({
                imageOverSize: true, imageOverSizeTxt: 'حجم عکس باید کمتر از 500 کیلوبایت باشد'
            })
        }

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
            messageBoxScc = ['hiden']
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
                    <input type="text" maxLength="110" className="InputElement margin20" placeholder="عنوان" ref={(title) => { this.title = title }} />
                    <input type="text" maxLength="110" className="InputElement margin20" placeholder="توضیح کوتاه " ref={(short_description) => { this.short_description = short_description }} />
                    <div style={{ width: '80%', margin: '0px auto 10px' }} >
                        <CKEditor
                            activeClass="p10 "
                            ref={(description) => { this.description = description }}
                            content={this.state.description}
                            events={{
                                "blur": this.onBlur,
                                "afterPaste": this.afterPaste,
                                "change": this.onChange
                            }}
                            config={{
                                contentsLangDirection: 'rtl',
                                font_style:
                                {
                                    element: '*',
                                    styles: { 'font-family': 'IRANSans' },
                                    overrides: [{ element: 'font', attributes: { 'face': null } }]
                                },
                                font_names: 'IRANSans',
                                fontSize_defaultLabel: '40px',
                                fontSize_style:
                                {
                                    element: 'p',
                                    styles: { 'font-size': '90px' },
                                    overrides: [{ element: 'font', attributes: { 'size': null } }]
                                }
                            }}
                        />

                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon xicon">
                                <FontAwesomeIcon className="DLIcon" icon={faImage} />
                            </span>
                            <span>انتخاب عکس</span>
                            <input className={'fileInputField '} type="file" name="عکس" accept='image/*' onChange={this.changeImage} ref={(image) => { this.image = image }} />
                        </div>
                        {/* <a target="_blank" className="play" href={this.state.image} >نمایش عکس</a> */}
                        <img src={this.state.image} alt="عکس" className="playEditPage " style={{ width: 'unset', height: '80px' }} />
                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon xicon">
                                <FontAwesomeIcon className="DLIcon" icon={faVideo} />
                            </span>
                            <span>انتخاب ویدیو</span>
                            <input className={'fileInputField '} type="file" name="ویدیو" accept='video/mp4' onChange={this.changeVideo} ref={(video) => { this.video = video }} />
                        </div>
                        {this.state.video ?
                            <div className="playEditPage" >
                                <Player
                                    playsInline
                                    poster=""
                                    src={this.state.video}
                                />
                            </div>
                            : <span className="playEditPage">فایل ویدیویی برای نمایش وجود ندارد</span>}
                    </div>
                    <div className="InputElement margin20 editPageInput" >
                        <div className="fileInput fileInputEdit" >
                            <span className="myIcon xicon ">
                                <FontAwesomeIcon className="DLIcon" icon={faVolumeUp} />
                            </span>
                            <span>انتخاب فایل صوتی</span>
                            <input className={'fileInputField '} type="file" name="فایل صوتی" accept='audio/mp3' onChange={this.changeAudio} ref={(audio) => { this.audio = audio }} />
                        </div>


                        {
                            this.state.audio ?
                                <div className="playEditPage" >
                                    <ReactAudioPlayer
                                        src={this.state.audio}
                                        autoPlay
                                        controls
                                    />
                                </div>
                                : <span className="playEditPage">فایل صوتی برای پخش وجود ندارد</span>
                        }


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
                <Footer />
            </div>
        )

    }
}

export default EditPage