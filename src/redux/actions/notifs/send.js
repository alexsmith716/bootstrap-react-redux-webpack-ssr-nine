import { initialState } from '../../reducers';
import types from '../action-types';

export default (notifs = initialState.notifs) => ({
  type: types.NOTIFS,
  notifs,
});
