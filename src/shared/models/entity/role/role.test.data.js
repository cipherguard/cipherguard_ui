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
 * @since         4.1.0
 */

import {v4 as uuidv4} from "uuid";

export const TEST_ROLE_USER_ID = uuidv4();
export const TEST_ROLE_ADMIN_ID = uuidv4();

export const userRoleDto = data => ({
  "id": TEST_ROLE_USER_ID,
  "name": "user",
  ...data,
});

export const adminRoleDto = data => ({
  "id": TEST_ROLE_ADMIN_ID,
  "name": "admin",
  ...data,
});
