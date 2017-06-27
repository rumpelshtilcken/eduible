import stylesheet from './index.css';

const Card = () =>
  (<header>
    <div>
      <div className="block">
        <div className="image" />
        <div>
          <h1>One Click Bookings</h1>
        </div>
        <div>
          <p>
            Dough-Boy hurried below, glanced at the watch, and reported the
            exact minute to Ahab.
          </p>
        </div>
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  </header>);

export default Card;
