/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         4.9.0
 */

import {ConfirmEditCreateOperationVariations, ConfirmEditCreateRuleVariations} from "./ConfirmCreateEdit";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    operation: ConfirmEditCreateOperationVariations.CREATE,
    rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
    resourceName: "resourceName",
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    onReject: jest.fn(),
  };

  return Object.assign(defaultData, data);
}
