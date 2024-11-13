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
 * @since         3.6.0
 */

import CipherguardApiFetchError from "../../../../shared/lib/Error/CipherguardApiFetchError";
import EntityValidationError from "../../../../shared/models/entity/abstract/entityValidationError";
/**
 * Default props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    error: new Error("Mocked unexpected error."),
    context: {}
  };
  return Object.assign(defaultProps, props);
}

/**
 * Cipherguard API fetch error props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function cipherguardApiFetchErrorProps(props = {}) {
  const error = new CipherguardApiFetchError("Could not finalize API request", {
    body: {
      message: "The provided Gpg doesn't fit the minimal requirements.",
    },
    code: 403
  });
  const defaultProps = {error};
  return Object.assign(defaultProps, props);
}

/**
 * Cipherguard Entity validation error props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function cipherguardEntityValidationErrorProps(props = {}) {
  const error = new EntityValidationError("Could not validate Entity");
  error.addError("algorithm", "enum", "The algorithm value is not included in the supported list.");
  const defaultProps = {error};
  return Object.assign(defaultProps, props);
}
