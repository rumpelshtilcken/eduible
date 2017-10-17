import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import * as types from 'actions/search/types';

const searchInputEpic = action$ =>
  action$.ofType(types.SEARCH_INPUT)
    .debounceTime(750)
    .distinctUntilChanged()
    .map(action => ({ type: types.SEARCH_UPDATE, name: 'input', value: action.value }));

export default searchInputEpic;
