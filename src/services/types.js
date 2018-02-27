/* eslint-disable import/prefer-default-export */

import { instanceOf } from 'prop-types';
import HierarchySelectorDataSourceProvider from './data-source-provider';

const dataSourceProviderType = instanceOf(HierarchySelectorDataSourceProvider);

export { dataSourceProviderType };
