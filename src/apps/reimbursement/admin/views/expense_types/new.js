import React from 'react'
import Form from 'portals/admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Expense Type',
      method: 'post',
      action: '/admin/reimbursement/expense_types',
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' }
          ]
        }
      ]
    }
  }

}

export default New
