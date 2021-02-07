/* eslint react/jsx-fragments: 0 */

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'rfv'

import './../css/style.scss'

const calculateBmi = props => {
  const { units, feet, inches, pounds, centimeters, kilograms } = props

  let bmi
  if (units === 'imperial') {
    const _inches = ((feet * 12) + parseInt(inches))
    bmi = ((pounds * 703) / (_inches * _inches)).toFixed(2)
  } else {
    const _centimeters = centimeters / 100
    bmi = (kilograms / (_centimeters * _centimeters)).toFixed(2)
  }

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
  const [selectedUnits, setSelectedUnits] = useState('metric')
  const [calculatedBmi, setCalculatedBmi] = useState({})
  const [removeItems, setRemoveItems] = useState([])

  const formOnSubmit = res => {
    if (res.isFormValid) {
      setCalculatedBmi(calculateBmi(res.items))
    }
  }

  const selectOnChange = res => {
    const { value } = res.e.target
    setSelectedUnits(value)
  }

  return (
    <div id='app'>
      <Form
        onSubmit={formOnSubmit}
        removeItems={removeItems}
      >
        <div className='formGroup'>
          <label htmlFor='units'>Units</label>
          <Select
            id='units'
            name='units'
            value={selectedUnits}
            onChange={selectOnChange}
          >
            <option value='imperial'>Imperial</option>
            <option value='metric'>Metric</option>
          </Select>
        </div>

        {
          selectedUnits === 'imperial'
            ? (
                <React.Fragment>
                  <div className='formGroup'>
                    <label htmlFor='feet'>Height: feet - inches</label>
                    <div className='row'>
                      <div className='col'>
                        <Input
                          id='feet'
                          type='tel'
                          name='feet'
                          placeholder='5'
                        />
                      </div>

                      <div className='col'>
                        <Input
                          type='tel'
                          id='inches'
                          name='inches'
                          placeholder='8'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='pounds'>Weight: pounds</label>
                    <Input
                      type='tel'
                      id='pounds'
                      name='pounds'
                      placeholder='143'
                    />
                  </div>
                </React.Fragment>
              )
            : (
                <React.Fragment>
                  <div className='formGroup'>
                    <label htmlFor='centimeters'>Height: centimeters</label>
                    <Input
                      type='tel'
                      id='centimeters'
                      placeholder='173'
                      name='centimeters'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='kilograms'>Weight: kilograms</label>
                    <Input
                      type='tel'
                      id='kilograms'
                      name='kilograms'
                      placeholder='65'
                    />
                  </div>
                </React.Fragment>
              )
        }

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
