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
 * @since         3.2.0
 */

/**
 * Get the value of an object from a path using dot notation
 * @param obj
 * @param path
 * @returns {string|undefined}
 */
export default (obj, path) => path
  .split('.')
  .reduce((accumulator, key) => accumulator?.[key], obj);
