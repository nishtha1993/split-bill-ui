import React from 'react';
import {Container, Row, Col} from 'react-amazing-grid';

export default class Comment extends React.Component {


   constructor(props) {
    super(props);
    this.state = { temp: true,
       isChecked1: true,
       isChecked2: true,
       isChecked3: true,
       isChecked4: true,


     };
     }



 toggleChange1 = () => {
    this.setState({
      isChecked1: !this.state.isChecked1,
    });
  }

 toggleChange2 = () => {
    this.setState({
      isChecked2: !this.state.isChecked2,
    });
  }

  toggleChange3 = () => {
    this.setState({
      isChecked3: !this.state.isChecked3,
    });
  }

  toggleChange4 = () => {
    this.setState({
      isChecked4: !this.state.isChecked4,
    });
  } 


remove = () => {
  console.log('Hello Remove');
  this.props.deleteFromBoard(
    this.props.dd.paidPerson,
    this.props.dd.amt,
    this.props.dd.f1,
    this.props.dd.f2,
    this.props.dd.f3,
    this.props.dd.f4,
    this.props.index);
 }

 save = () => {
  var balance;
  var money1,money2,money3,money4;
  var splitMoney = 0;
  var splitPerson = 0;
  if(this.state.isChecked1){
  var stateCheck = "true";

  splitPerson++;
  }else{
    var stateCheck1 = "false";
    money1 = 0;
  }

  if(this.state.isChecked2){
  var stateCheck2 = "true"; 
  splitPerson++;
  }else{
    var stateCheck2 = "false";
    money2 = 0;
  }

  if(this.state.isChecked3){
  var stateCheck3 = "true"; 
  splitPerson++;
  }else{
    var stateCheck3 = "false";
    money3 = 0;
  }

  if(this.state.isChecked4){
  var stateCheck4 = "true"; 
  splitPerson++;
  }else{
    var stateCheck4 = "false";
    money4 = 0;
  }

  splitMoney = this.refs.newText3.value / splitPerson;
console.log(splitMoney);
  if (this.state.isChecked1){
    money1 = splitMoney;
   // balance = balance - splitMoney;
  }
  if (this.state.isChecked2){
    money2 = splitMoney;
  }
 if (this.state.isChecked3){
    money3 = splitMoney;
  }
  if (this.state.isChecked4){
    money4 = splitMoney;
  }

 if (this.refs.newText2.value == "Me" || this.refs.newText2.value == "me" ) {
  money1 = 0;


  // this.props.balance = this.props.balance + this.refs.newText3.value - splitMoney;  

 }

 if (this.refs.newText2.value == "Welisa" || this.refs.newText2.value == "welisa" ) {
  money2 = 0;
 }

 if (this.refs.newText2.value == "Rohan" || this.refs.newText2.value == "rohan" ) {
  money3 = 0;
 }

 if (this.refs.newText2.value == "Varun" || this.refs.newText2.value == "varun" ) {
  money4 = 0;
 }

 // this.props.balance(balance);
  // this.props.updateBalance(this.props.balance);

  this.props.updateCommentText(this.refs.newText.value,
    this.refs.newText2.value,
    this.refs.newText3.value,
    money1, 
    money2,
    money3,
    money4,
    splitPerson,
    splitMoney,
    this.props.index);
  console.log(splitMoney); 
    console.log(this.refs.newText2.value); 
    this.setState({temp:false});
 
 }



  renderNormal(){
    return(
      <div>
        <div>
        <h2> {this.props.dd.name} </h2>
        </div>
        <div className="horizontalLine">
      </div>

      <div>
        <table className="mainTable">
        <tr>
        <th>Amount: {this.props.dd.amt}</th>
        <th>Paid by:{this.props.dd.paidPerson}</th>
    
        </tr>
        </table>
        </div>
      <div>
        <table className="memberTable">
  <tr>
    <th>Member</th>
    <th>Amount</th>
  </tr>
  <tr>
    <td>Me</td>
    <td>Rs. {this.props.dd.f1} </td>
  </tr>
  <tr>
    <td>Welisa</td>
    <td>Rs. {this.props.dd.f2}</td>
  </tr>
    <tr>
    <td>Rohan</td>
    <td>Rs. {this.props.dd.f3}</td>
  </tr>
    <tr>
    <td>Varun</td>
    <td>Rs. {this.props.dd.f4}</td>
  </tr>
</table>
      </div>


        <div className="horizontalLine">
      </div>
        <h3> {this.props.sum} </h3>
        <div>
        <button onClick={this.remove} className="saveRemove"> Completed </button>
        </div>
        <div className="horizontalRemove">
      </div>


      </div>  
       );
  }

  renderForm(){
    return(
        <div>


        <Container>
        <Row>

        <Col>

          <input ref="newText" placeholder={'Enter Bill Name'} className="billStyle" required></input>
        </Col>
        </Row>
        <Row>

         <Col>
         <span>Paid by: </span>
          <input ref="newText2" placeholder={'Person paid'} className="paidStyle"></input>
        </Col>

        <Col>
          <span>Amount: </span>
          <input ref="newText3" placeholder={'Rs.'} className="amtStyle"></input>
          </Col>
          </Row>



        <Row>
        <span className="splitWith">Split with: </span>

<label className="container">
  <input type="checkbox"
  checked={this.state.isChecked1}
    onChange={this.toggleChange1}/>Me
  <span className="checkmark"></span>
</label>
<label className="container">
  <input type="checkbox"
  checked={this.state.isChecked2}
    onChange={this.toggleChange2}/>Welisa
  <span className="checkmark"></span>
</label>
<label className="container">Rohan
  <input type="checkbox"
  checked={this.state.isChecked3}
    onChange={this.toggleChange3}/>
  <span className="checkmark"></span>
</label>
<label className="container">Varun
  <input type="checkbox"
  checked={this.state.isChecked4}
  onChange={this.toggleChange4}/>
  <span className="checkmark"></span>
</label>
        </Row>
          </Container>

    <button onClick={this.save} className="saveRemove"> Save </button>
        </div>
      );
  }


 render (){
    if (this.state.temp) {
      return this.renderForm();
    }else{
      return this.renderNormal();
    }   
 }


}
