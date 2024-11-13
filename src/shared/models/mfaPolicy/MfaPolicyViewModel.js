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
 * @since         3.10.0
 */

/**
 * Model related to the mfa policy use only with the UI
 */
class MfaPolicyViewModel {
  /**
   * Constructor
   * @param {MfaPolicyDto} settings
   */
  constructor(settings = {remember_me_for_a_month: false}) {
    this.policy = settings.policy;
    this.rememberMeForAMonth = settings.remember_me_for_a_month;
  }
}

export default MfaPolicyViewModel;
