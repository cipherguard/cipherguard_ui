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

import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {MfaContextProvider} from "../../../contexts/MFAContext";
import YubikeySetup from "./YubikeySetup";
import {defaultProps} from "./YubikeySetup.test.data";

export default {
  title: 'Components/MFA/YubikeySetup',
  component: YubikeySetup
};

const Template = args =>
  <MfaContextProvider {...args}>
    <MockTranslationProvider>
      <div className="panel middle">
        <YubikeySetup {...args} />
      </div>
    </MockTranslationProvider>;
  </MfaContextProvider>;

export const Default = Template.bind({});
Default.args = defaultProps();
