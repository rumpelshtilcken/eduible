import { Component } from 'react';

import { StudentProfile } from 'components';

class StudentProfileContainer extends Component {
  universities = [
    {
      image: '/static/hogwarts.jpg',
      title: 'Hogwarts',
      description: 'Hogwarts Castle is a large, seven-storey high building supported by magic, with a hundred and forty two staircases throughout its many towers and turrets and very deep dungeons.',
      course: 'Computer science',
      percentage: 75,
      tips: [
        'Sign up for an English course',
        'Talk to a professional who studied at this university',
        'Pray that you have successfully passed the exam',
        'Sign up for an English courses',
        'Talk to a professional who studied at this universitys',
        'Pray that you have successfully passed the exams'
      ]
    },
    {
      image: '/static/harvard.jpg',
      title: 'Harvard',
      description: 'Hogwarts Castle is a large, seven-storey high building supported by magic, with a hundred and forty two staircases throughout its many towers and turrets and very deep dungeons.',
      course: 'Graphic design',
      percentage: 84,
      tips: [
        'Sign up for an English course',
        'Talk to a professional who studied at this university'
      ]
    },
    {
      image: '/static/cambridge.jpg',
      title: 'Cambridge',
      description: 'Hogwarts Castle is a large, seven-storey high building supported by magic, with a hundred and forty two staircases throughout its many towers and turrets and very deep dungeons.',
      course: 'Computer science',
      percentage: 100,
      tips: [
        'Sign up for an English course'
      ]
    }
  ];

  user = {
    name: 'Anna Stark',
    location: 'Miami, FL'
  }


  handleRemoveFromListClick() {
    // TODO: remove university from list
  }

  render() {
    return (
      <StudentProfile
        user={this.user}
        universities={this.universities}
        onRemoveFromListClick={this.handleRemoveFromListClick}
      />);
  }
}

export default StudentProfileContainer;
