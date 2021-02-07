import React, { useState } from 'react'
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

const calculateBmi = props => {
  const { height, weight } = props
  const height2 = height / 100
  const bmi = (weight / (height2 * height2)).toFixed(2)
  let status = ''
  if (bmi < 18.5) {
    status = 'underweight'
  } else if (bmi < 25) {
    status = 'normal'
  } else if (bmi < 30) {
    status = 'overweight'
  } else {
    status = 'obese'
  }
  return { bmi, status }
}

const App = () => {
  const [calculatedBmi, setCalculatedBmi] = useState({})
  const formOnSubmit = res => {
    if (res.isFormValid) {
      setCalculatedBmi(calculateBmi(res.items))
    }
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
          <label htmlFor='weight'>Weight: kilograms</label>
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

      {
        calculatedBmi.status
          ? (
              <div className={`bmiResult ${calculatedBmi.status}`}>
                Your BMI is <b>{calculatedBmi.bmi}</b>
              </div>
            )
          : (<div className='bmiResult'>Type your size above</div>)
      }

      <div className='bmiTable'>
        <div className={`tr ${calculatedBmi.status === 'underweight' ? calculatedBmi.status : ''}`}>
          <div className='td'>{`<`} 18.5</div>
          <div className='td'>Underweight</div>
        </div>

        <div className={`tr ${calculatedBmi.status === 'normal' ? calculatedBmi.status : ''}`}>
          <div className='td'>18.5 - 24.9</div>
          <div className='td'>Normal</div>
        </div>

        <div className={`tr ${calculatedBmi.status === 'overweight' ? calculatedBmi.status : ''}`}>
          <div className='td'>25.0 - 29.9</div>
          <div className='td'>Overweight</div>
        </div>

        <div className={`tr ${calculatedBmi.status === 'obese' ? calculatedBmi.status : ''}`}>
          <div className='td'>30+</div>
          <div className='td'>Obese</div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
