import { SearchTextInput } from 'components';

import stylesheet from './index.css';

const Search = () =>
  (<div className="searchBlock">
    <p className="searchTitle">Browse through more than 5000+ universities in the US</p>
    <SearchTextInput placeholder="search by university, major,college…" />

    <style jsx>
      {stylesheet}
    </style>
  </div>);

export default Search;
