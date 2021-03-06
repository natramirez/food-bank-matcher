import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Modal extends Component {
    constructor(props) {
		super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modalClassName: "modal"
        }
    }

    toggleModal(event) {
        event.preventDefault();
        this.setState({ 
            modalClassName: this.state.modalClassName === "modal" ? "modal showModal" : "modal"
        });
    }

    render() {
        let actionBtn = this.props.modalBtn1 && this.props.modalBtn1OnClick ?
            <button 
            type="button" 
            className="btn btn-primary" 
            onClick={event => {this.toggleModal(event);this.props.modalBtn1OnClick(event)}}>{this.props.modalBtn1}
            </button> : "";
        return (
            <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" onClick={event => this.toggleModal(event)}>{this.props.modalToggleBtn}</button>
            <div className={this.state.modalClassName} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={event => this.toggleModal(event)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.modalBody}
                        </div>
                        <div className="modal-footer">
                            {actionBtn}
                            <button 
                            type="button" 
                            className="btn btn-secondary"
                             onClick={event => this.toggleModal(event)}
                             >
                                Close
                             </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(Modal);