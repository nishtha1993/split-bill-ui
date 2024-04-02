import React, { Component } from 'react';

import MessageView from './message-view';

export default class MessageList extends Component {

  state = {
    messages:  [
      {
        billName: 'Dinner at the Restaurant',
      },
      {
        billName: this.val,

      },
    ]
  }
  render() {
    
    const messages  = this.state.messages.map(function(message, index) {
      return(
        <MessageView key={index} message={message} />
      )
    })
    return(
      <div>
        {messages}
      </div>
    )
  }
}

 MessageList;
