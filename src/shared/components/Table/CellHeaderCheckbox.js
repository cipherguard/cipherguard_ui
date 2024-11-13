/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2023 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         4.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

/**
 * This component represents a cell header checkbox
 */
class CellHeaderCheckbox extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="input checkbox">
        <input
          type="checkbox"
          name="select all"
          checked={this.props.checked}
          onChange={this.props.onChange}/>
      </div>
    );
  }
}

CellHeaderCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired, // The checked value
  onChange: PropTypes.func // The onChange function property
};

export default CellHeaderCheckbox;
