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
 * @since         4.9.3
 */

import {v4 as uuidv4} from 'uuid';

/**
 * Build default group transfer dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultNeededSecretDto = (data = {}) => {
  const defaultData = {
    user_id: uuidv4(),
    resource_id: uuidv4(),
    ...data
  };

  return defaultData;
};
