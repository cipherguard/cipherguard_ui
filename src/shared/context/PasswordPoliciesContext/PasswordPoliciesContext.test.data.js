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
 * @since         4.2.0
 */

import {defaultPasswordPoliciesDto} from "../../models/passwordPolicies/PasswordPoliciesDto.test.data";

/**
 * Default password policies context
 * @param {object} data The data to override
 * @returns {object}
 */
export const defaultPasswordPoliciesContext = (data = {}) => {
  const policies = data?.policies || defaultPasswordPoliciesDto();
  return {
    policies: policies,
    getPolicies: jest.fn(),
    findPolicies: jest.fn(),
    shouldRunDictionaryCheck: jest.fn(() => policies?.external_dictionary_check || false),
    ...data
  };
};
