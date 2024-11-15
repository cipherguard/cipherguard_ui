/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2021 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import AppContext from "./contexts/AppContext";
import DisplayInFormMenu from "./components/DisplayInFormMenu/DisplayInFormMenu";
import TranslationProvider from "../shared/components/Internationalisation/TranslationProvider";
import PasswordPoliciesContext from "../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";

/**
 * Entry point of the in-form menu
 */
class ExtInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initLocale();
  }

  /**
   * Returns the default stare
   */
  get defaultState() {
    return {
      locale: "en-UK",
      port: this.props.port
    };
  }

  /**
   * Init the locale
   * @returns {Promise<void>}
   */
  async initLocale() {
    const {locale} = await this.props.port.request("cipherguard.locale.get");
    this.setState({locale});
  }

  /**
   * Render the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json" locale={this.state.locale}>
          <PasswordPoliciesContext>
            <div className="web-integration">
              <DisplayInFormMenu/>
            </div>
          </PasswordPoliciesContext>
        </TranslationProvider>
      </AppContext.Provider>
    );
  }
}

ExtInForm.propTypes = {
  port: PropTypes.object
};

export default ExtInForm;
