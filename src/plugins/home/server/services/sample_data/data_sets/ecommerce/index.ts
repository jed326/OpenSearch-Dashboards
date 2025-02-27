/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import path from 'path';
import { i18n } from '@osd/i18n';
import { getSavedObjects } from './saved_objects';
import { fieldMappings } from './field_mappings';
import { SampleDatasetSchema, AppLinkSchema } from '../../lib/sample_dataset_registry_types';
import { getSavedObjectsWithDataSource, appendDataSourceId } from '../util';

const ecommerceName = i18n.translate('home.sampleData.ecommerceSpecTitle', {
  defaultMessage: 'Sample eCommerce orders',
});
const ecommerceDescription = i18n.translate('home.sampleData.ecommerceSpecDescription', {
  defaultMessage: 'Sample data, visualizations, and dashboards for tracking eCommerce orders.',
});
const initialAppLinks = [] as AppLinkSchema[];

const DEFAULT_INDEX = 'ff959d40-b880-11e8-a6d9-e546fe2bba5f';
const DASHBOARD_ID = '722b74f0-b882-11e8-a6d9-e546fe2bba5f';

export const ecommerceSpecProvider = function (): SampleDatasetSchema {
  return {
    id: 'ecommerce',
    name: ecommerceName,
    description: ecommerceDescription,
    previewImagePath: '/plugins/home/assets/sample_data_resources/ecommerce/dashboard.png',
    darkPreviewImagePath: '/plugins/home/assets/sample_data_resources/ecommerce/dashboard_dark.png',
    overviewDashboard: appendDataSourceId(DASHBOARD_ID),
    appLinks: initialAppLinks,
    defaultIndex: appendDataSourceId(DEFAULT_INDEX),
    savedObjects: (dataSourceId?: string, dataSourceTitle?: string) =>
      getSavedObjectsWithDataSource(getSavedObjects(), dataSourceId, dataSourceTitle),
    dataIndices: [
      {
        id: 'ecommerce',
        dataPath: path.join(__dirname, './ecommerce.json.gz'),
        fields: fieldMappings,
        timeFields: ['order_date'],
        currentTimeMarker: '2016-12-11T00:00:00',
        preserveDayOfWeekTimeOfDay: true,
      },
    ],
    status: 'not_installed',
  };
};
