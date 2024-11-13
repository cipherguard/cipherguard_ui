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
 * @since         4.9.4
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {Router} from "react-router-dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import {createMemoryHistory} from "history";
import FilterResourcesBySharedWithMePage from "./FilterResourcesBySharedWithMePage";

/**
 * The FilterResourcesBySharedWithMePage component represented as a page
 */
export default class FilterResourcesBySharedWithMePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <FilterResourcesBySharedWithMePage {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the displayed resources if any
   * @returns {NodeListOf<HTLMElement>}
   */
  get resources() {
    return this._page.container.querySelectorAll(".list-items .browse-resource-entry");
  }

  /**
   * Returns a resource by its index if any
   * @param {number} index
   * @returns {HTLMElement|null}
   */
  getResource(index) {
    return this.resources[index] ?? null;
  }

  /**
   * Returns the back button element
   * @returns {HTLMElement}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link a");
  }

  /**
   * Returns the main message currently displayed
   * @returns {string|null}
   */
  get displayedMainMessage() {
    return this._page.container.querySelector(".empty-entry")?.textContent || null;
  }

  /**
   * Simulates a click on the nth resource given by the index
   * @returns {Promise<void>}
   */
  async clickOnResource(index) {
    const element = this.getResource(index)?.querySelector(".inline-resource-entry");
    fireEvent.click(element, {button: 0});
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async clickOnBackButton() {
    fireEvent.click(this.backButton, {button: 0});
    await waitFor(() => {});
  }
}
