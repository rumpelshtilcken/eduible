import PropTypes from 'prop-types';
import cx from 'classnames';

import { StudentProfileCard as Card } from 'components';

import stylesheet from './index.css';

const TabMenu = ({ tabs, activeTab, onTabChange }) => (
  <div className="wrapper">
    <Card>
      <div className="tabMenu">
        {
          tabs.map((tab, index) =>
            (<button
              className={cx({ active: index === activeTab })}
              onClick={onTabChange}
            >
              <a href={tab.href}>
                {tab.label}
                <span className={cx('notifyDot', {
                  hidden: !tab.isNotifiable
                })}
                />
              </a>
            </button>)
          )
        }
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>
);

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default TabMenu;
