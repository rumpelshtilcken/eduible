/* @flow */

import { compose } from 'recompact';

import withData from 'hoc/withData';

import withLayout from './withLayout';

const page = compose(withData, withLayout);

export default page;
