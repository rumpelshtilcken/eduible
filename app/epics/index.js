import { combineEpics } from 'redux-observable';
import search from './search';

const rootEpic = combineEpics(search);

export default rootEpic;
