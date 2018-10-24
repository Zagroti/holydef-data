import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faTrashAlt, faImage, faVideo, faVolumeUp , faEdit} from '@fortawesome/free-solid-svg-icons'



library.add(faTrashAlt, fas, faImage, faVideo, faVolumeUp ,faEdit)

const dataBox = (props) => {




    return (
        <div  >

            <div className="dataBox">
                {/* <span>{props.dataId} </span> */}
                <div className="myImageBox" >
                    <div className="myTitleBox">
                        <div className="subtitleBox" >
                            <div className="titleBox" >
                                <label className="dataLabel" > عنوان :</label>
                                <p className="dataText color3"  >{props.title} </p>
                            </div>
                            <div className="titleBox" >
                                <label className="dataLabel" >توضیح کوتاه : </label>
                                <p className="dataText color3 " >{props.short_description}  </p>
                            </div>
                        </div>
                        <div className="videoBox">
                            <img className="" alt="عکس" src={props.image} />



                        </div>

                    </div>
                    <div className="dataBtnBox" >
                        <div className="twoBtnBox" >
                            <button className="dataBtn editBtn" onClick={props.editData} >
                                <FontAwesomeIcon className="DLIcon" icon={faEdit} />
                            </button>
                            <button className="dataBtn deleteBtn" onClick={props.deleteData}>
                                <FontAwesomeIcon className="DLIcon" icon={faTrashAlt} />
                            </button>
                        </div>
                        <div className="twoPlay" >

                            {
                                props.video ?
                            <div className="play" >
                                <a href={props.video} target="blank"  className="playLink" >
                                    <FontAwesomeIcon className="DLIcon" icon={faVideo} />
                                </a>
                            </div>
                             : <span className="">     </span> 
                            }
                            {
                                props.audio ?
                                <div className="play">
                                    <a href={props.audio} target="blank" className="playLink"  >
                                        <FontAwesomeIcon className="DLIcon" icon={faVolumeUp} />
                                    </a>
                                </div>
                                : <span className="">     </span>
                            }


                        </div>
                    </div>
                </div>
                {/* <div className="titleBox" >
                    <label className="dataLabel" >توضیحات بلند : </label>
                    <p className="dataText color3 " >   {props.description}  </p>
                </div>
                <div className="titleBox" >
                    <label className="dataLabel" >عکس :</label>
                    <p className="dataText color3 " >{props.image} </p>
                </div>
                <div className="titleBox" >
                    <label className="dataLabel" >ویدیو :</label>
                    <p className="dataText color3 " >{props.video} </p>
                </div>
                <div className="titleBox" >
                    <label className="dataLabel" > فایل صوتی : </label>
                    <p className="dataText color3 " >{props.audio}   </p>
                </div> */}



            </div>

        </div>
    );

};

export default dataBox;