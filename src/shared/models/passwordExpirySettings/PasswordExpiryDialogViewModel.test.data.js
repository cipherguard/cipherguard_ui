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
 * @since         4.5.0
 */

import {PasswordExpiryOptionEnum} from './PasswordExpiryDialogViewModel';

/**
 * A default password expiry dialog ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultPasswordExpiryDialogViewModelDto = (data = {}) => {
  const defaultData = {
    passwordExpiryDurationInDay: 30,
    passwordExpiryDate: "2023-01-01",
    passwordExpiryOption: PasswordExpiryOptionEnum.AUTOMATIC,
  };

  return Object.assign(defaultData, data);
};
