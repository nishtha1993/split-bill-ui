import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import {Container, Row, Col} from 'react-amazing-grid';
import Centered from './Centered';
import Board from './Board';
import MessageList from './message-list';


class App extends Component {


    render() {
    return (
      <div className = "mainBody">
<div className="navBar">
  
<ul>
  <li className="navli"><a href="#home">Home</a></li>
  <li className="navli"><a href="#Contribute">Contribute</a></li>
  <li  className="navli" ><a href="#contact">Contact</a></li>
  <li className="rightNav"><a href="#about">Subscribe</a></li>
  <li className="rightNav"><a href="#Next">About</a></li>
</ul>

</div>
      <Container>
        <Row>
        <Col xs={1} xsoffset={1}>
        </Col>
        <Col xs={7} xsoffset={1}>
          <div className="ListDiv">

              <Board />
          </div>
        </Col>
        <Col xs={3} xsoffset={4}>
        <div className = "members">
          <div className="name">
          <h2> Dion George </h2>

          </div>
  <table className="membersSidebar">
  <tr>
    <th>Group</th>

  </tr>
  <tr>
    <td>Parash</td>
  </tr>
  <tr>
    <td>Rahul</td>
  </tr>
  <tr>
    <td>Nishita</td>
  </tr>
  <tr>
    <td>Pradheep</td>
  </tr>

</table>

        </div>
        </Col>
        </Row>
        </Container>

      </div>
    );
  }
}

export default App;
