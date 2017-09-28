import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { ResponsiveMenu } from 'components';

import stylesheet from './index.css';

const PageHeader = ({ authenticated, buttons, links }) => (
  <MuiThemeProvider>
    <div>
      <div className="headerContainer">
        <div className="logo">
          <img src={'static/Icons/logoColored.svg'} alt={'logo'} />
        </div>
        {
          authenticated
            ? <ResponsiveMenu links={links} />
            : <ResponsiveMenu buttons={buttons} />
        }
      </div>

      <style jsx>{stylesheet}</style>
    </div>
  </MuiThemeProvider>
);

PageHeader.propTypes = {
  authenticated: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.shape({
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
