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
 * @since         4.10.0
 */

/**
 * Sort an array of resources alphabetically
 * @param {Array<ResourceEntityDto>} resources
 */
export const sortResourcesAlphabetically = resources => {
  resources?.sort((resource1, resource2) => {
    const resource1Name = resource1.metadata.name.toUpperCase();
    const resource2Name = resource2.metadata.name.toUpperCase();
    return resource1Name.localeCompare(resource2Name);
  });
};
