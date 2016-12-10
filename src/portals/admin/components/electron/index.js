import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Electron extends React.Component {

  static childContextTypes = {
    electron: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    const { children } = this.props
    return <div>{ children }</div>
  }

  componentDidMount() {
    if(this.props.location.query.electron) {
      this.props.onEnable()
    }
  }

  getChildContext() {
    return {
      electron: {
      }
    }
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  onEnable: actions.enable
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Electron), 'electron', true)
