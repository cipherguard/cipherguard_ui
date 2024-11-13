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
 * @since         4.8.0
 */


import {defaultPermissionDto} from "./permissionEntity.test.data";

/**
 * Build dtos.
 * @param {number} [count=10] The number of dtos.
 * @param {object} data The data to override the default dto.
 * @param {object} options Options to pass to the permission factory.
 * @returns {object}
 */
export const defaultPermissionsDtos = (count = 10, data = {}, options = {}) => {
  const dtos = [];
  const acoForeignKey = crypto.randomUUID();
  for (let i = 0; i < count; i++) {
    const dto = defaultPermissionDto({aco_foreign_key: acoForeignKey, ...data}, options);
    dtos.push(dto);
  }
  return dtos;
};

