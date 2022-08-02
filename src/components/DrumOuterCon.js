import React, { Component } from 'react';
import DrumPad from './DrumPad';

export default class DrumOuterCon extends Component {
      constructor(props){
            super(props);
            this.state = {
                  power: true,
                  bank: false,
                  bankData: props.bankOne,
                  volume: 0.5,
                  display: ""
            }
            this.handlePower = this.handlePower.bind(this);
            this.handleBank = this.handleBank.bind(this);
            this.handleVolume = this.handleVolume.bind(this);
            this.handleDisplay = this.handleDisplay.bind(this);
      }
      handlePower(){
            this.setState((state) => ({
                  power: !state.power,
                  display: "",
            }))
      }
      handleBank(){
            this.setState((state, props) => ({
                  bank: !state.bank,
                  bankData: state.bank ? props.bankOne : props.bankTwo,
                  display: !state.bank ? "Smooth Piano Kit" : "Heater Kit"
            }))
      }
      handleVolume(e){
            if (this.state.power) {
                  this.setState({
                        volume: e.target.value,
                        display: "Volume: " + Math.round(e.target.value * 100)
                  })
                  setTimeout(() => this.setState({display: ""}), 1000);
            }
      }
      handleDisplay(name){
            this.setState({
                  display: name
            })
      }
  render() {
    return (
      <div className='inner_container'>
            <div className='drum_pad_container' id="drum-machine">
                  {this.state.bankData.map((it, i) => (
                        <DrumPad 
                              key={i}
                              data={it}
                              power={this.state.power}
                              volume={this.state.volume} 
                              displayFun={this.handleDisplay} 
                        />
                  ))}
            </div>
            <div className="drum_controller">
                  <p>Power</p>
                  <label className="switch">
                        <input onClick={this.handlePower} type="checkbox" defaultChecked/>
                        <span className="slider"></span>
                  </label>
                  <div className="display">
                        <p id='display'>{this.state.display}</p>
                  </div>
                  <div>
                        <input type="range" name="volume-range" id="volume-range" value={this.state.volume} min={0} max={1} step="0.01" onChange={this.handleVolume} className='audio_volume' />
                  </div>
                  <p>Bank</p>
                  <label className="switch">
                        <input disabled={!this.state.power} onClick={this.handleBank} type="checkbox" />
                        <span className="slider slider_bank"></span>
                  </label>
            </div>
      </div>
    )
  }
}
