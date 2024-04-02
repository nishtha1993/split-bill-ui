import React from 'react';
import Comment from './Comment';
import {Container, Row} from 'react-amazing-grid';
import './index.css';
export default class Board extends React.Component {
 constructor (props){
    super(props);
    this.state = { 
    data: 
    [
    {       "name":"test1",
            "paidPerson": "Dion",
            "amt":0,
            "f1":0,
            "f2":0,
            "f3":0,
            "f4":0,
            "sp":0,
            "sm":0,
            "money":0

             }

              ],
              good:[],
              toGet:0,
              bad:[],
              toGive:0 


  } 
 }

add = (text) => {
    let dataTemp = this.state.data;
    dataTemp.push(text);
    this.setState({data:dataTemp})
   }


  removeComment = (newPP,newAmt,nf1,nf2,nf3,nf4,i) => {
  
  console.log('Hi');
  if (newPP == "Me" || newPP == "me"){
    var attempt= 1;
    if (nf2!=0){
      attempt++;
    }
    if (nf3!=0){
      attempt++;
    }
    if (nf4!=0){
      attempt++;
    }    
    var variable1 = (newAmt/attempt)*(attempt-1);
    var index3 = this.state.good.length;
    for(var j = 0; j < index3; j++){
      if(this.state.good[j] == variable1){
        this.state.good.splice(j,1);
      }
    }
    index3 = this.state.good.length;
    this.state.toGet = 0;
    for(var j = 0; j < index3; j++){
      this.state.toGet = this.state.toGet + this.state.good[j];
    }
  }

if (nf1 != 0){
  var index4 = this.state.bad.length;
  for(var j = 0; j < index4; j++){
      if(this.state.bad[j] == nf1){
        this.state.bad.splice(j,1);
      }
    }
  index4 = this.state.bad.length;
    this.state.toGive = 0;
    for(var j = 0; j < index4; j++){
      this.state.toGive = this.state.toGive + this.state.bad[j];
    }

}


console.log('Remove' + i);
  let dataTemp = this.state.data;
  delete dataTemp[i];
  this.setState({data:dataTemp})

  }

 
  updateComment = (newText,newPP,newAmt,nf1,nf2,nf3,nf4,nsp,nsm,i)=> {


 let dataTemp = this.state.data;
  dataTemp[i].name = newText;
  dataTemp[i].paidPerson = newPP;
  dataTemp[i].amt = newAmt;
  dataTemp[i].f1 = nf1;
  dataTemp[i].f2 = nf2;
  dataTemp[i].f3 = nf3;
  dataTemp[i].f4 = nf4;
  dataTemp[i].sp = nsp;
  dataTemp[i].sm = nsm;    

this.setState({data:dataTemp});

if (newPP == "Me" || newPP == "me"){
  var variable1 = newAmt - nsm;
  this.state.good.push(variable1);
  var index1 = this.state.good.length;
  this.state.toGet = 0;
  for(var j = 0; j < index1; j++){
    this.state.toGet = this.state.toGet + this.state.good[j];
  }
}

if (nf1 == nsm){
  this.state.bad.push(nf1);
    var index2 = this.state.bad.length;
    this.state.toGive = 0;
    for(var j = 0; j < index2; j++){
    this.state.toGive = this.state.toGive + this.state.bad[j];
  }
}

}

  // myBalance = (num,i) => {
  // return(<Comment keyBal={i} 
  //   indexBal={i} 
  //   balance={num} 
  //   updateBalanceText={this.updateBalance}></Comment>);
  //  }
 

  
  eachComment = (d, idx) => {
  return(<Comment key={idx}
    index = {idx} 
    dd={d}

    updateCommentText={this.updateComment}
    deleteFromBoard={this.removeComment}></Comment>);
   }

render() {
    return (
       <div>
       <Container>
       <Row>
       <h2>Track your Billings, Sam.</h2>
       <button onClick={this.add.bind()} className="addBillBtn"><span>Add Bill</span></button>
        </Row>



       <Row>


          <table className="mainTable">
        <tr>
        <th>Amount to Receive: {this.state.toGet}</th>
        <th>Amount to Pay: {this.state.toGive}</th>

        </tr>
        </table>
        </Row>
        </Container>
        {this.state.data.map(this.eachComment)}
      </div>
    );
  }
}