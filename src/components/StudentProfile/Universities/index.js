import PropTypes from 'prop-types';

import University from '../University';

const Universities = ({
  universities,
  onRemoveFromListClick,
  onReadMoreClick,
  onCalculatedClick }) =>
  (<div>
    {
      universities.map(university =>
        (<University
          university={university}
          onRemoveFromListClick={onRemoveFromListClick}
          onReadMoreClick={onReadMoreClick}
          onCalculatedClick={onCalculatedClick}
        />)
      )
    }
  </div>);

Universities.propTypes = {
  universities: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveFromListClick: PropTypes.func.isRequired,
  onReadMoreClick: PropTypes.func.isRequired,
  onCalculatedClick: PropTypes.func.isRequired
};

export default Universities;
