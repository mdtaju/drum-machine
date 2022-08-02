import React, { Component } from 'react';

const activeStyle = {
      background: "#ff5b00",
      transform: "translateY(1px)",
      boxShadow: "3px 3px 5px #ff5b00"
}
const inActiveStyle = {
      background: "#8d8d8d"
}

export default class DrumPad extends Component {
      constructor(props){
            super(props);
            this.state = {
                  keyStyle: inActiveStyle
            }
            this.soundPlay = this.soundPlay.bind(this);
            this.handleKeyPress = this.handleKeyPress.bind(this);
            this.handleActiveStyle = this.handleActiveStyle.bind(this);
            this.handleInActiveStyle = this.handleInActiveStyle.bind(this);
            this.handleClick = this.handleClick.bind(this);
      }
      componentDidMount(){
            document.addEventListener("keydown", this.handleKeyPress);
      }
      componentDidUnMount(){
            document.addEventListener("keydown", this.handleKeyPress);
      }
      handleKeyPress(e){
            if(this.props.power){
                  e.keyCode === this.props.data.keyCode && this.soundPlay();
            }            
      }
      soundPlay(){
            const Audio = document.getElementById(this.props.data.keyTrigger);
            Audio.currentTime = 0;
            Audio.volume = this.props.volume;
            Audio.play();
            this.props.displayFun(this.props.data.id);
            this.handleActiveStyle();
            setTimeout(() => this.handleInActiveStyle(), 100);
      }
      handleActiveStyle(){
            this.setState({
                  keyStyle: activeStyle
            })
      }
      handleInActiveStyle(){
            this.setState({
                  keyStyle: inActiveStyle
            })
      }
      handleClick(){
            this.props.power && this.soundPlay();
      }
  render() {
    return (
      <div id={this.props.data.keyCode} style={this.state.keyStyle} className='drum-pad' onClick={() => this.handleClick()}>
            <audio 
                  src={this.props.data.url} 
                  id={this.props.data.keyTrigger}
                  className='clip'
            />
            <span>{this.props.data.keyTrigger}</span>
      </div>
    )
  }
}
