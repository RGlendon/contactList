import React, {Component} from "react";
import {connect} from "react-redux";

import styles from "./ContactList.module.css";
import Card from "./Card/Card";
import SlideManager from "../../components/common/SlideManager/SlideManager";
import {deleteContact, updateContactInfo} from "../../redux/contactsReducer";




class ContactList extends Component {
    constructor(props) {
        super(props);
        this.commonCarousel = React.createRef();
        this.containerCarousel = React.createRef();
        this.sliderCarousel = React.createRef();
    }

    componentDidMount() {
        this.SliderManager = new SlideManager({
            commonCarousel: this.commonCarousel.current,
            containerCarousel: this.containerCarousel.current,
            sliderCarousel: this.sliderCarousel.current,
            options: {
                isInfinity: false,
                isLooped: false,
                slidesToShow: 6,
                canDrag: true,
                speed: .5,
                axis: 'Y',
            },
        });
        this.SliderManager.init();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.contacts !== this.props.contacts) {
            this.SliderManager.addClass();
        }
    }

    render() {
        let contacts = this.props.contacts.map((data) => <div className={styles.item} key={data._id}>
                <Card data={data} key={data._id}
                      deleteContact={this.props.deleteContact}
                      updateContactInfo={this.props.updateContactInfo}/>
            </div>);

        return (
            <div className={styles.common} ref={this.commonCarousel}>
                <div className={styles.container} ref={this.containerCarousel}>
                    <div className={styles.movingContainer} ref={this.sliderCarousel}>
                        {this.props.isLogin && contacts}
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contactsPage.contacts,
        isLogin: state.auth.isLogin
    }
};

const mapDispatchToProps = {
    deleteContact,
    updateContactInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
