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

      <div className='bmiResult'>
        Type your size above
      </div>

      <div className='bmiTable'>
        <div className='tr'>
          <div className='td'>BMI</div>
          <div className='td'>Weight Status</div>
        </div>

        <div className='tr'>
          <div className='td'>Below 18.5</div>
          <div className='td'>Underweight</div>
        </div>

        <div className='tr'>
          <div className='td'>18.5 - 24.9</div>
          <div className='td'>Normal</div>
        </div>

        <div className='tr'>
          <div className='td'>25.0 - 29.9</div>
          <div className='td'>Overweight</div>
        </div>

        <div className='tr'>
          <div className='td'>30.0 and above</div>
          <div className='td'>Obese</div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
