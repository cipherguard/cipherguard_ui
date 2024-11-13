/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         3.0.0
 */

import {ImportGpgKeyVariations} from "./ImportGpgKey";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    displayAs: ImportGpgKeyVariations.SETUP,
    onComplete: jest.fn(() => Promise.resolve()),
    onSecondaryActionClick: jest.fn(() => Promise.resolve()),
    context: {
      port: {
        request: jest.fn(async() => ({}))
      }
    },
    validatePrivateGpgKey: jest.fn(),
    shouldShowExpiryDateWarning: jest.fn(() => Promise.resolve(false))
  };
  return Object.assign(defaultProps, props || {});
}
