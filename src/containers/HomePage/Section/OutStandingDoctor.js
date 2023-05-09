import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
// import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import OutStandingDoctorImg from "../../../assets/OutStandingDoctor/medlatec.png"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
class OutStandingDoctor extends Component {

    render() {


        return (
            <div className="section-OutStandingDoctor">
                <div className='OutStandingDoctor-container'>
                    <div className='OutStandingDoctor-header'>
                        <div className='title-section'>Bác sĩ nổi bật tuần qua</div>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='OutStandingDoctor-body'>
                        <Slider {...this.props.settings}>

                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='OutStandingDoctor-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Văn Linh</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
