// import { SET_ } from '../actions'
// 
// const initialState = {
//   device: {},
//   randomInteger: {}
// }
// 
// 
// const device = (state = initialState.device) => {
// 
//   return state
// 
// }
// 
// 
// const randomInteger = (state = initialState.randomInteger) => {
// 
//   return state
// 
// }
// 
// 
// const sharedReducers = (state = initialState) => {
// 
//   return {
//     device: device(state.device),
//     randomInteger: randomInteger(state.randomInteger)
//   }
// 
// }
// 
// export default sharedReducers


export default function sharedReducers(state = {}) {
  return state;
}
