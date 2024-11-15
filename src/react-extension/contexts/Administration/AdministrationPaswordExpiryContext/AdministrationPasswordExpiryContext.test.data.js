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

export function defaultAdminPasswordExpiryContext(props) {
  const context = {
    getSettings: jest.fn(),
    setSettingsBulk: jest.fn(),
    findSettings: jest.fn(),
    isProcessing: jest.fn(),
    validateData: jest.fn(),
    save: jest.fn(),
    getErrors: jest.fn(),
    isFeatureToggleEnabled: jest.fn(),
    setFeatureToggle: jest.fn(),
    hasSettingsChanges: jest.fn(),
    isSubmitted: jest.fn(),
    setSubmitted: jest.fn(),
    setDefaultExpiryToggle: jest.fn(),
  };

  return Object.assign(context, props);
}
