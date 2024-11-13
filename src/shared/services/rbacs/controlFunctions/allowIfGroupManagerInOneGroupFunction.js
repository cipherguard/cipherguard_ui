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

import ControlFunction from "./ControlFunction";

export default class AllowIfGroupManagerInOneGroupFunction extends ControlFunction {
  /**
   * The cool control.
   *
   * @returns {boolean}
   */
  static execute(user) {
    return user.groups_users.some(group => group.is_admin);
  }
}
