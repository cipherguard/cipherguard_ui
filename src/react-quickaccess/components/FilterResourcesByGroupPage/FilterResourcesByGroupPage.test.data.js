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
import MockPort from "../../../react-extension/test/mock/MockPort";
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {createMemoryHistory} from "history";
import {defaultGroupDto} from "../../../shared/models/entity/group/groupEntity.test.data";

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export function defaultProps(props = {}) {
  const port = new MockPort();
  port.addRequestListener("cipherguard.resources.find-all-ids-by-is-shared-with-group", () => new Promise(resolve => setTimeout(() => resolve(props.groups ?? []), 4000)));
  port.addRequestListener("cipherguard.groups.find-all", () => new Promise(resolve => setTimeout(() => resolve(props.resources ?? []), 4000)));
  const defaultContext = {port};
  const defaultProps = {
    context: defaultAppContext(
      {
        ...defaultContext,
        ...props?.context
      }),
  };

  delete props.context; // Treated in the default

  return Object.assign(defaultProps, props);
}

/**
 * No groups props.
 * @param props
 * @return {Object}
 */
export function noGroupsProps(props) {
  const port = new MockPort();
  port.addRequestListener("cipherguard.resources.find-all-ids-by-is-shared-with-group", () => []);
  port.addRequestListener("cipherguard.groups.find-all", () => []);
  const defaultContext = {port};
  const context = {
    ...defaultContext,
    ...props?.context
  };
  return defaultProps({context});
}

/**
 * With groups props.
 * @param props
 * @return {Object}
 */
export function withGroupsProps(props) {
  const port = new MockPort();
  const groups = props?.groups || [
    defaultGroupDto({
      name: "group1"
    }),
    defaultGroupDto({
      name: "group2"
    }),
    defaultGroupDto({
      name: "group3"
    }),
    defaultGroupDto({
      name: "group4"
    })
  ];
  port.addRequestListener("cipherguard.groups.find-all", () => groups);
  const defaultContext = {port};
  const context = {
    ...defaultContext,
    ...props?.context
  };
  return defaultProps({context});
}

/**
 * No groups props.
 * @param props
 * @return {Object}
 */
export function withSelectedGroupProps(props) {
  const propsWithGroup = defaultProps(props);
  propsWithGroup.history = createMemoryHistory();
  propsWithGroup.location = propsWithGroup.history.location;

  propsWithGroup.location.state = {
    selectedGroup: defaultGroupDto().id
  };

  return propsWithGroup;
}

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export function withFilteredResourcesProps(props) {
  const port = new MockPort();

  const resources = props?.resources ?? [
    defaultResourceDto({
      metadata: {
        name: "apache",
        username: "www-data",
        uris: ["http://www.apache.org/"],
        description: "Apache is the world\u0027s most used web server software.",
      }
    }, {withTags: true}),
    defaultResourceDto({
      metadata: {
        name: "cipherguard",
        username: "cipherguard",
        uris: ["http://www.cipherguard.local/"],
        description: "cipherguard.",
      }
    }, {withTags: true})
  ];

  port.addRequestListener("cipherguard.groups.find-all", () => [
    defaultGroupDto({name: "group1"}),
    defaultGroupDto({name: "group2"})
  ]);
  port.addRequestListener("cipherguard.resources.find-all-ids-by-is-shared-with-group", () => [resources[0]?.id, resources[1]?.id]);
  const defaultContext = {port};
  const context = Object.assign(defaultContext, props?.context);

  return withSelectedGroupProps({context, resources: resources
  });
}
