/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         2.11.0
 */

import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {
  defaultResourceWorkspaceContext, resourceWorkspaceContextWithSelectedFolderICanRead,
  resourceWorkspaceContextWithSelectedFolderIOwn
} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    dialogContext: defaultDialogContext(),
    workflowContext: defaultWorkflowContext(),
    ...data
  };
}

/**
 * Default props one folder owned
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultPropsFolderOwned(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: resourceWorkspaceContextWithSelectedFolderIOwn(),
    dialogContext: defaultDialogContext(),
    workflowContext: defaultWorkflowContext(),
    ...data
  };
}

/**
 * Default props one folder not owned
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultPropsFolderNotOwned(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: resourceWorkspaceContextWithSelectedFolderICanRead(),
    dialogContext: defaultDialogContext(),
    workflowContext: defaultWorkflowContext(),
    ...data
  };
}

/**
 * Props with denied UI action.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithDenyUiAction(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data
  });
}
