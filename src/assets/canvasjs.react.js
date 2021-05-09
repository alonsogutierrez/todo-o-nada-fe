import React from 'react'
import PropTypes from 'prop-types'

var CanvasJS = require('./canvasjs.min')
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS

let _cjsContainerId = 0

class CanvasJSChart extends React.Component {
  constructor(props) {
    super(props)
    _cjsContainerId++
    this.options = props.options ? props.options : {}
    this.containerProps = props.containerProps
      ? props.containerProps
      : { width: '100%', position: 'relative' }
    this.containerProps.height =
      props.containerProps && props.containerProps.height
        ? props.containerProps.height
        : this.options.height
        ? this.options.height + 'px'
        : '400px'
    this.chartContainerId = 'canvasjs-react-chart-container-' + _cjsContainerId
  }
  componentDidMount() {
    //Create Chart and Render
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options)
    this.chart.render()

    if (this.props.onRef) this.props.onRef(this.chart)
  }
  shouldComponentUpdate(nextProps) {
    //Check if Chart-options has changed and determine if component has to be updated
    return !(nextProps.options === this.options)
  }
  componentDidUpdate() {
    //Update Chart Options & Render
    this.chart.options = this.props.options
    this.chart.render()
  }
  componentWillUnmount() {
    //Destroy chart and remove reference
    this.chart.destroy()
    if (this.props.onRef) this.props.onRef(undefined)
  }
  render() {
    //return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });
    return <div id={this.chartContainerId} style={this.containerProps} />
  }
}

var CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS
}

export default CanvasJSReact

CanvasJSChart.defaultProps = {
  options: {},
  onRef: () => {},
  containerProps: {}
}

CanvasJSChart.propTypes = {
  options: PropTypes.object,
  onRef: PropTypes.func,
  containerProps: PropTypes.object
}
