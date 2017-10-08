import { Component } from 'react';
import PropTypes from 'prop-types';

import { RoundedButton } from 'components';

import ProfessionalProfileInfo from './ProfessionalProfileInfo';
import ProfessionalProfileImg from './ProfessionalProfileImg';
import stylesheet from './index.css';

class ProfessionalProfileHeader extends Component {
  static propTypes = {
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    isCurrentUser: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      professional: PropTypes.shape({
        price: PropTypes.number,
        location: PropTypes.shape({
          country: PropTypes.string
        }),
        job: PropTypes.shape({
          company: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
          jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
        }),
        majors: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          })
        }))
      })
    })
  };


  renderButton = () => (this.props.isCurrentUser
    ? <RoundedButton title={'Request call'} onClick={this.props.onRequestCallClick} />
    : <RoundedButton title={'Edit Profile'} onClick={this.props.onEditButtonClick} />)

  render() {
    const { user } = this.props;

    return (
      <div className="profileHeader">
        <ProfessionalProfileImg>
          {this.renderButton()}
        </ProfessionalProfileImg>

        <div className="lists">
          <ProfessionalProfileInfo user={user} />
        </div>
        <div className="circles">
          <div className="firstCircle">
            <div className="circle">
              <p>$7</p>
            </div>
            <p className="price">Price</p>
          </div>
          <div className="secondCircle">
            <div className="circle">
              <p>5</p>
            </div>
            <p className="price">Rating</p>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}


export default ProfessionalProfileHeader;
