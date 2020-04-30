import { createActions } from 'redux-actions'

const INCREMENT_COUNT = 'INCREMENT_COUNT'
const DECREMENT_COUNT = 'DECREMENT_COUNT'

export const APP = {
  INCREMENT_COUNT,
  DECREMENT_COUNT
}

export default createActions({
  [INCREMENT_COUNT]: ({ counter = 1 }) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(counter)
    }, 500)
  }),
  [DECREMENT_COUNT]: ({ counter = 1 }) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(counter)
    }, 500)
  })
})