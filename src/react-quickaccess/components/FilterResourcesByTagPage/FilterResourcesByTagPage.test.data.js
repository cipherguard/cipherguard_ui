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
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const defaultProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [
    defaultResourceDto({}, {withTags: true})
  ],
  ...data
});

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const noResourcesProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: null,
  ...data
});

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const noTagsProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [],
  ...data
});

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export const withFilteredResourcesProps = (data = {}) => {
  const resource1 = defaultResourceDto({
    metadata: {
      name: "apache",
      username: "www-data",
      uris: ["http://www.apache.org/"],
      description: "Apache is the world\u0027s most used web server software.",
    }
  }, {withTags: true});

  const resource2 = defaultResourceDto({
    metadata: {
      name: "esaie",
      username: "test",
      uris: ["http://www.essaie.org/"],
      description: "",
    },
    tags: resource1.tags
  });

  return {
    context: defaultAppContext(data.context),
    resources: [resource1, resource2],
    ...data
  };
};
