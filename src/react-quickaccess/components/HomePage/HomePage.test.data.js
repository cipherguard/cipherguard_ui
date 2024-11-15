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

import {defaultAppContext} from "../../contexts/AppContext.test.data";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import MockPort from "../../../react-extension/test/mock/MockPort";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceLocalStorageContext} from "../../contexts/ResourceLocalStorageContext.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourcesLocalStorageContext: defaultResourceLocalStorageContext(),
    resources: null,
    getOpenerTabId: () => 1,
    ...data
  };
}

/**
 * Loading props.
 * @return {Object}
 */
export function loadingProps() {
  const context = new defaultAppContext();
  return defaultProps({context});
}

/**
 * No resources props.
 * @return {Object}
 */
export function noResourcesProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: []});
  const context = new defaultAppContext({
    storage: mockStorage
  });
  return defaultProps({context});
}

/**
 * Search no result props.
 * @return {Object}
 */
export function searchNoResultProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: []});
  const context = new defaultAppContext({
    storage: mockStorage,
    search: "apache",
  });
  return defaultProps({context});
}

/**
 * Search with results props.
 * @return {Object}
 */
export function searchWithResultProps() {
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: [defaultResourceDto({name: "apache", uri: "http://www.apache.org"}), defaultResourceDto()]});
  const context = new defaultAppContext({
    storage: mockStorage,
    search: "apache",
  });
  return defaultProps({context});
}

/**
 * Suggested resources props.
 * @return {Object}
 */
export function suggestedResourcesProps() {
  const port = new MockPort();
  port.addRequestListener("cipherguard.active-tab.get-url", () => "http:\/\/www.apache.org\/");
  const mockStorage = new MockStorage();
  mockStorage.local.set({resources: [defaultResourceDto({name: "apache", uri: "http://www.apache.org"}), defaultResourceDto()]});
  const context = new defaultAppContext({
    storage: mockStorage,
    port: port,
  });
  return defaultProps({context});
}

/**
 * Suggested resources props with deny ui action.
 * @return {Object}
 */
export function denyUiActionProps(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data,
  });
}
