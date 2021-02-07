import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Input } from 'rfv'

import './../css/style.scss'

const validations = {
  isInt: [
    {
      rule: 'isInt',
      invalidFeedback: 'Please provide a value'
    }
  ]
}

const App = () => {
  const formOnSubmit = res => {
    console.log(res.items)
  }

  return (
    <div id='app'>
      <Form onSubmit={formOnSubmit}>
        <div className='formGroup'>
          <label htmlFor='height'>Height: centimeters</label>
          <Input
            type='text'
            id='height'
            name='height'
            placeholder='173'
            validations={validations.isInt}
          />
        </div>

        <div className='formGroup'>
          <label htmlFor='weight'>Weight: centimeters</label>
          <Input
            type='text'
            id='weight'
            name='weight'
            placeholder='65'
            validations={validations.isInt}
          />
        </div>

        <div className='formGroup'>
          <button>Calculate</button>
        </div>
      </Form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
