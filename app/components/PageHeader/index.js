import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { ResponsiveMenu } from 'components';

import stylesheet from './index.css';

const PageHeader = ({ buttons, links, onLogoutButtonClick }) => (
  <MuiThemeProvider>
    <div>
      <div className="headerContainer">
        <div className="logo">
          <img src={'static/Icons/logoColored.svg'} alt={'logo'} />
        </div>
        <ResponsiveMenu
          buttons={buttons}
          links={links}
          onLogoutButtonClick={onLogoutButtonClick}
        />
      </div>

      <style jsx>{stylesheet}</style>
    </div>
  </MuiThemeProvider>
);

PageHeader.propTypes = {
  onLogoutButtonClick: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    profile: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    prefetch: PropTypes.bool.isRequired
  }))
};

PageHeader.defaultProps = {
  authenticated: false
};

export default PageHeader;
