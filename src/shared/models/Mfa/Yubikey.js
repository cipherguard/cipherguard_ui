/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2022 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         3.8.0
 */


/**
 * Model related to Yubikey model
 */
class Yubikey {
  /**
   * Constructor
   *
   * @param {Yubikey} yubikey duo object from server
   * @public
   */
  constructor(yubikey = {}) {
    this.clientId = "yubikeyClientIdentifier" in yubikey ? yubikey.yubikeyClientIdentifier : yubikey.clientId;
    this.secretKey = "yubikeySecretKey" in yubikey ? yubikey.yubikeySecretKey : yubikey.secretKey;
  }
}

export default Yubikey;


