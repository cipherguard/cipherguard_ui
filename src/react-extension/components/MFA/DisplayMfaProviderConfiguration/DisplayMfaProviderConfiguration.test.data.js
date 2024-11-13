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
 * @since         4.4.0
 */

import {defaultProps} from "../DisplayProviderList/DisplayProviderList.test.data";

export function propsMfaWithProvider(provider) {
  return  defaultProps({
    mfaContext: {
      provider,
      goToProviderList: jest.fn(),
      removeProvider: jest.fn()
    }
  });
}

export const mockVerifiedDate = {
  verified: "2023-09-27T13:03:23+00:00"
};
