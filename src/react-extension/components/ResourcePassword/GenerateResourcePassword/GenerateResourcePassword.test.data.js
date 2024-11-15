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

import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultPasswordPoliciesContext} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  context: defaultAppContext(),
  passwordPoliciesContext: defaultPasswordPoliciesContext(),
  resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
  actionFeedbackContext: defaultActionFeedbackContext(),
  onClose: jest.fn(),
  ...props
});
