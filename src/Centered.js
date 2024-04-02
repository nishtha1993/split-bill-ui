import React from 'react';

import './index.css';

import Form from "./Form";

export default class Centered extends React.Component {
 
   state = {    
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
      }
    });
  };
 
 
 state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {


    const { open } = this.state;
    return (
      <div>
        <button className="addBillBtn" onClick={this.onOpenModal}>
          <span>Add Bill</span>
        </button>
      </div>
    );
  }
}












