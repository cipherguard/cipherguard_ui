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
import {userSettingsRbacsCollectionData} from "../../../models/entity/rbac/rbacsCollection.test.data";

export const defaultRbacMeService = props => jest.fn().mockImplementation(() => ({
  findMe: () => userSettingsRbacsCollectionData(),
  ...props
}));
