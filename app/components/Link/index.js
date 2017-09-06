import PropTypes from 'prop-types';
import NextLink from 'next/link';

import stylessheet from './index.css';

const Link = ({ href, children, prefetch }) =>
  (<NextLink href={href} prefetch={prefetch}>
    <a className="link">
      {children}

      <style jsx>
        {stylessheet}
      </style>
    </a>
  </NextLink>);

Link.defaultProps = {
  prefetch: true
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  prefetch: PropTypes.bool
};

export default Link;
