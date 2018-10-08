import React, { Component } from 'react'
import axios from '../axios';  // set base URL from axios --->
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer';
import Navbar from './Navbar'

library.add(faWindowClose, fas)

class EditPage extends Component {

    state = {
        formIsValid: false,
        loading: false,
        progressPercent: null,
        error: false,
        errorText: '',
        success: false,
        successText: '',
        verfy: false,
        title: '',
        short_description: '',
        description: '',
        image: '',
        video: '',
        audio: '',
        catId:null,
        id:null
    }
    componentWillMount(){
        const myState = this.props.history.location.state
        this.setState({
            title: myState.title,
            short_description:myState.short_description,
            description:myState.description,
            image:myState.image,
            video:myState.video,
            audio:myState.audio,
            catId:myState.catId,
            id:myState.id
        })
    }
    componentDidMount() {
        this.title.value = this.state.title
        this.short_description.value = this.state.short_description
        this.description.value = ' ' || this.state.description
        this.image = ' ' || this.state.image
        this.video = ' ' || this.state.video
        this.audio = ' ' || this.state.audio
        console.log('aud: ' + this.audio)
        // this.nameTitle.value;
    }



    // sent button FUNCTION
    orderHandler = (event) => {

        event.preventDefault();
        this.setState({ error: false, success: false })

        var bodyFormData = new FormData();
        bodyFormData.append('title', this.title.value);
        bodyFormData.append('short_description', this.short_description.value);
        bodyFormData.append('description', this.description.value );
        bodyFormData.append('image', this.state.image, this.state.image)
        bodyFormData.append('video', this.state.video, this.state.video)
        bodyFormData.append('audio', this.state.audio, this.state.audio)

        if (this.state.verfy) {
            axios({
                method: 'post',
                url:  `/api/v1/article/${this.state.catId}/update/${this.state.id}`,
                data: bodyFormData,
                onUploadProgress: progressBar => {
                    let progressPercent = Math.round(progressBar.loaded / progressBar.total * 100)
                    console.log(progressPercent)
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

        if (!this.state.verfy) {
            this.nameInput.focus();
        }

    }


    // verfication CODE Handler
    verficationCodeHandler = (event) => {
        if (event.target.value === '1111') {
            this.setState({ verfy: true })
        } else {
            this.setState({ verfy: false })
        }
    }

    // close success and error MESSAGE WINDOW 
    close = () => {
        this.setState({ error: false, success: false, vefryShow: false })
    }

    changeImage = (e)=>{
        console.log(e.target.files[0].name)
        this.setState({image:e.target.files[0] })
    }
    changeVideo = (e)=>{
        this.setState({video:e.target.files[0] })
    }
    changeAudio = (e)=>{
        this.setState({audio:e.target.files[0] })
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
                    <input type="text" className="InputElement" ref={(title) => { this.title = title}} />
                    <input type="text" className="InputElement" ref={(short_description) => { this.short_description = short_description }} />
                    <input type="text" className="InputElement" ref={(description) => { this.description = description }} />
                    <div className="InputElement" >
                        <input type="file" className="" name="عکس" accept='image/*' onChange={this.changeImage} ref={(image) => { this.image = image }} />
                        <a target="_blank" href={this.state.image} >{/[^/]*$/.exec(this.state.image)[0]}</a>
                    </div>
                    <div className="InputElement" >
                        <input type="file" className="" name="ویدیو" accept='video/*' onChange={this.changeVideo} ref={(video) => { this.video = video }} />
                        <a target="_blank" href={this.state.video} >{/[^/]*$/.exec(this.state.video)[0]}</a>
                    </div>
                    <div className="InputElement" >
                        <input type="file" className="" name="فایل صوتی" accept='audio/*' onChange={this.changeAudio} ref={(audio) => { this.audio = audio }} />
                        <a target="_blank" href={this.state.audio} >{/[^/]*$/.exec(this.state.audio)[0]}</a>
                    </div>
                </div>

                <div className="sendVerfy">
                    <button className="sendBtn">ارسال</button>
                    <input type="text" className="verfyInput"
                        ref={(input) => { this.nameInput = input}}
                        placeholder="کد امنیتی"
                        onChange={(event) => this.verficationCodeHandler(event)}
                        required />
                </div>
            </form>


        );
        return (
            <div>
                <Navbar />
                <div className="container formDiv">
                    <h2 className="formTitle color1">ویرایش محتوا</h2>
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
                                    <FontAwesomeIcon className="closeIcon" icon={faWindowClose} onClick={this.close} />
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
                <Footer />
            </div>
        )

    }
}

export default EditPage