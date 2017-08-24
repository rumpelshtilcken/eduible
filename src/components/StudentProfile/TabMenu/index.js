import Card from '../Card';
import stylesheet from './index.css';

const TabMenu = () => (
  <div className="wrapper">
    <Card>
      <ul className="tabMenu">
        <li className="active">Universities</li>
        <li>Grades</li>
        <li>Conversations
          <span className="notifyDot" />
        </li>
      </ul>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>
);

export default TabMenu;
