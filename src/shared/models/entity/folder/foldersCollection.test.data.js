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
 * @since         4.9.4
 */
import {defaultFolderDto} from "./folderEntity.test.data";

/**
 * Build dtos.
 * @param {number} [foldersCount=10] The number of dtos.
 * @param {object} [data]
 * @returns {object}
 */
export const defaultFoldersCollectionDto = (foldersCount = 10, data = {}) => {
  const dtos = [];
  for (let i = 0; i < foldersCount; i++) {
    const dto = defaultFolderDto({name: `folder ${i}`, ...data});
    dtos.push(dto);
  }
  return dtos;
};

