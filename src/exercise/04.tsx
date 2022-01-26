// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  return {on, toggle, togglerProps: {'aria-pressed': on, onClick: toggle}}
}

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// extra credit - with own onClick handler
function useExtraToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // helper function to take in an array of functions and render them one by one
  function callAll<Args extends Array<unknown>>(
    ...fns: Array<((...args: Args) => unknown) | undefined>
  ) {
    return (...args: Args) => fns.forEach(fn => fn?.(...args))
  }

  // prop getter function to extend props with custom properties passed into the function
  function getTogglerProps<Props>({
    onClick,
    className = '',
    ...props
  }: {
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']
    className?: string
  } & Props) {
    return {
      'aria-pressed': on,
      className: `${className} some-class`,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }
  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useExtraToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.log('clicked aswel'),
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
export default App

/*
eslint
  no-unused-vars: "off",
*/
