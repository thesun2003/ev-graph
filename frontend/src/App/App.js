import React, { Component } from 'react';
import TotalAmount from '../Components/TotalAmount/TotalAmount'
import GoogleGraph from '../Components/GoogleGraph/GoogleGraph'
import TableauReport from 'react-tableau-report';
import ScriptLoad from 'react-load-script'
import logo from './logo.svg';
import './App.css';


class TableauEmbeded2 extends Component {
  constructor(props) {
    super(props);    

    const options = {
      height: 100,
      width: 100,
      hideTabs: false,
      hostUrl: "https%3A%2F%2Fpublic.tableau.com%2F",
      // All other vizCreate options are supported here, too
      // They are listed here: https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
    };
    const filters = {};
    const parameters = {};
  };

  render() {
    return <TableauReport
      url="https://public.tableau.com/views/EVv3/Story1"
      filters={this.filters}
      parameters={this.parameters}
      options={this.options} // vizCreate options
    />
  };
}


class TableauEmbeded extends Component {
  runJustAfter() {
    var divElement = document.getElementById('viz1503038590375');
    var vizElement = divElement.getElementsByTagName('object')[0];
    vizElement.style.width = '100%';
    vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }

  handleScriptCreate() {
    console.log('scriptCreate');
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError() {
    console.log('scriptError');
    this.setState({ scriptError: true })
  }
   
  handleScriptLoad() {
    console.log('scriptLoaded');
    this.setState({ scriptLoaded: true })
    this.runJustAfter();
  }

  render() {
    return (
      <div className="tableauPlaceholder" id="viz1503038590375">
        <ScriptLoad
          url="https://public.tableau.com/javascripts/api/viz_v1.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <object className="tableauViz" style={{display: 'none'}}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="site_root" value />
          <param name="name" value="EVv3/Evregoshare" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/EV/EVv3/Evregoshare/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
        </object>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TotalAmount />
        </div>
        <p className="App-intro">
          Electric vehicles (including Hybrid) registered in NZ
        </p>
        <GoogleGraph />
        <TableauEmbeded />
        https://public.tableau.com/views/EVv3/Story1?:embed=yes&:showVizHome=no&:tabs=no&:toolbar=yes
        https://public.tableau.com/profile/stuart8512#!/vizhome/EVv3/Evregoshare?:embed=yes&:showVizHome=no&:tabs=no&:toolbar=yes
        https://public.tableau.com/profile/stuart8512#!/vizhome/EVv3/battplugfleet?:embed=yes&:showVizHome=no&:tabs=no&:toolbar=yes
        https://public.tableau.com/profile/stuart8512#!/vizhome/EVv3/battplug_1?:embed=yes&:showVizHome=no&:tabs=no&:toolbar=yes
      </div>
    );
  }
}

export default App;
