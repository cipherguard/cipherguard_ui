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

const AppContext = React.createContext({
  context: null,
});

/**
 * App Context Consumer HOC
 * @param WrappedComponent
 */
export function withAppContext(WrappedComponent) {
  return class withAppContext extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {
            AppContext => <WrappedComponent context={AppContext} {...this.props} />
          }
        </AppContext.Consumer>
      );
    }
  };
}

export default AppContext;
