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

/**
 * The default passphrase generator settings DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultPassphraseGeneratorSettingsDto = (data = {}) => ({
  words: 9,
  word_separator: " ",
  word_case: "lowercase",
  ...data,
});
