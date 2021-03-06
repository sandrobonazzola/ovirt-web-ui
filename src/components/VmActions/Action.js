import React from 'react'
import PropTypes from 'prop-types'
import { excludeKeys } from 'patternfly-react'

import { hrefWithoutHistory } from '_/helpers'

import style from './style.css'

class Action extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (e) {
    if (e && e.preventDefault) e.preventDefault()
    this.setState({ showModal: true })
  }

  handleClose () {
    this.setState({ showModal: false })
  }

  render () {
    const { children, confirmation } = this.props
    let trigger = children
    let confirmationDialog = confirmation || null
    if (confirmation) {
      trigger = React.cloneElement(trigger, { onClick: this.handleOpen })
      confirmationDialog = React.cloneElement(confirmationDialog, { show: this.state.showModal, onClose: this.handleClose })
    }
    return <React.Fragment>
      {trigger}
      {confirmationDialog}
    </React.Fragment>
  }
}
Action.propTypes = {
  children: PropTypes.node.isRequired,
  confirmation: PropTypes.node,
}

export default Action

class Button extends React.Component {
  render () {
    let {
      className,
      tooltip = '',
      actionDisabled = false,
      onClick,
      shortTitle,
      id,
    } = this.props

    let handleClick = hrefWithoutHistory(onClick)

    if (actionDisabled) {
      return (
        <button className={`${className} ${style['disabled-button']}`} disabled='disabled' id={id}>
          <span data-toggle='tooltip' data-placement='left' title={tooltip}>
            {shortTitle}
          </span>
        </button>
      )
    }

    return (
      <span className={style['full-button']}>
        <a href='#' onClick={handleClick} className={`${className} ${style['link']}`} id={id}>
          <span data-toggle='tooltip' data-placement='left' title={tooltip} id={`${id}-title`}>
            {shortTitle}
          </span>
        </a>
      </span>
    )
  }
}
Button.propTypes = {
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  shortTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  actionDisabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
}

const ActionButtonWraper = (props) => {
  const btnProps = excludeKeys(props, [ 'confirmation' ])
  return <Action confirmation={props.confirmation} key={props.shortTitle}><Button {...btnProps} /></Action>
}
ActionButtonWraper.propTypes = {
  confirmation: PropTypes.node,
  ...Button.propTypes,
}

export { ActionButtonWraper }
