/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2022 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         3.7.4
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByRecentlyModifiedPage from "./FilterResourcesByRecentlyModifiedPage";
import {defaultProps, noResourcesProps, suggestedResourcesProps} from "../HomePage/HomePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/FilterResourcesByRecentlyModified',
  component: FilterResourcesByRecentlyModifiedPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><FilterResourcesByRecentlyModifiedPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const InitialLoad = Template.bind({});
InitialLoad.args = defaultProps();
InitialLoad.parameters = parameters;

export const NoRecentlyModifiedResource = Template.bind({});
NoRecentlyModifiedResource.args = noResourcesProps();
NoRecentlyModifiedResource.parameters = parameters;

export const RecentlyModifiedResources = Template.bind({});
RecentlyModifiedResources.args = suggestedResourcesProps();
RecentlyModifiedResources.parameters = parameters;
