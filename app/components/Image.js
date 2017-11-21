import { Component } from 'react';
import PropTypes from 'prop-types';
import { Image as CloudinaryImage } from 'cloudinary-react';

import { cloudinaryConfig } from 'config';

const { cloudName } = cloudinaryConfig;

class Image extends Component {
  state = { width: 0 }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ width: this.container.offsetWidth });
  }

  getRef = (node) => { this.container = node; }

  render() {
    return (
      <div ref={this.getRef}>
        {this.state.width === 0 ? (
          <div>Placeholder</div>
        ) : (
          <CloudinaryImage
            cloudName={cloudName}
            publicId={this.props.publicId}
            width={this.state.width}
            crop="scale"
          />
        )}
      </div>
    );
  }
}

Image.propTypes = {
  publicId: PropTypes.oneOf(PropTypes.string).isRequired
};

export default Image;
