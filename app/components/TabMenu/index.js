import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { StudentProfileCard as Card } from 'components';

import stylesheet from './index.css';

const TabMenu = ({ tabs, childrens }) => (
  <div className="wrapper">
    <Tabs>
      <div className="tabList">
        <Card>
          <TabList>
            {
              tabs.map(tab => (
                <Tab>
                  { tab.title }
                  <span className={cx('notifyDot', {
                    hidden: !tab.isNotifiable
                  })}
                  />
                </Tab>
              ))
            }
          </TabList>
        </Card>
      </div>

      <div className="tabPanel">
        { childrens.map(children => <TabPanel>{children}</TabPanel>) }
      </div>
    </Tabs>
    <style jsx global>{stylesheet}</style>
  </div>
);

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    isNotifiable: PropTypes.bool
  })).isRequired,
  childrens: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default TabMenu;
