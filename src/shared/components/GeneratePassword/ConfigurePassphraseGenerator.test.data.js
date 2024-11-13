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
 * @since         3.4.0
 */

import {
  defaultPassphraseGeneratorSettingsDto
} from "../../models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export function defaultProps(props = {}) {
  const configuration = props?.configuration
    ? Object.assign({}, props.configuration)
    : defaultPassphraseGeneratorSettingsDto();

  return {
    configuration: configuration,
    onConfigurationChanged: jest.fn(newConfiguration => {
      Object.entries(newConfiguration).forEach(([fieldName]) => {
        configuration[fieldName] = newConfiguration[fieldName];
      });
    })
  };
}