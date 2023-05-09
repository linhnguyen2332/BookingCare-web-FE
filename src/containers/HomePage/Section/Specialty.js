import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/Specialty/co.jpg"

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
class Specialty extends Component {

    render() {

        
        return (
            <div className="section-specialty">
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-section'>Chuyên khoa phổ biến</div>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img' />
                                <div>Cơ xương khớp 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
