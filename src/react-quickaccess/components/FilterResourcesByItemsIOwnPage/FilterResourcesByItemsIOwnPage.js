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
 * @since         2.0.0
 */

import PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {filterResourcesBySearch} from "../../../shared/utils/filterUtils";
import {withResourcesLocalStorage} from "../../contexts/ResourceLocalStorageContext";
import memoize from "memoize-one";

const BROWSED_RESOURCES_LIMIT = 100;

class FilterResourcesByItemsIOwnPage extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.props.context.focusSearch();
    if (this.props.context.searchHistory[this.props.location.pathname]) {
      this.props.context.updateSearch(this.props.context.searchHistory[this.props.location.pathname]);
    }
  }

  /**
   * Initializes event handlers
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectResourceClick = this.handleSelectResourceClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handles the click event on the "Go back" button.
   * @param {Event} ev
   */
  handleGoBackClick(ev) {
    ev.preventDefault();
    // Clean the search and remove the search history related to this page.
    this.props.context.updateSearch("");
    delete this.props.context.searchHistory[this.props.location.pathname];
    this.props.history.goBack();
  }

  /**
   * Handles the click event on a resource from the list.
   * @param {Event} ev
   * @param {string} resourceId
   */
  handleSelectResourceClick(ev, resourceId) {
    ev.preventDefault();
    /*
     * Add a search history for the current page.
     * It will allow the page to restore the search when the user will come back after clicking goBack (caveat, the workflow is not this one).
     * By instance when you select a resource you expect the page to be filtered as when you left it.
     */
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`);
  }

  /**
   * Filters the given resources by 'owned by me'
   * @param {Array<Object>} resources
   * @returns {Array<Object>}
   */
  filterByOwnedByMe = memoize(resources => resources.filter(resource => resource.permission.type === 15));

  /**
   * Get the resources to display
   * @param {Array<Object>} resources the resource list to filter from
   * @param {string} search the keyword to search for in the list if any
   * @return {Array<Object>} The list of resources.
   */
  filterSearchedResources = memoize((resources, search) => {
    const ownedResources = this.filterByOwnedByMe(resources);
    return search
      ? filterResourcesBySearch(ownedResources, search, BROWSED_RESOURCES_LIMIT)
      : ownedResources;
  });

  /**
   * Component renderer.
   * @returns {JSX}
   */
  render() {
    const isReady = this.props.resources != null;
    const isSearching = this.props.context.search.length > 0;
    let browsedResources;

    if (isReady) {
      browsedResources = this.filterSearchedResources(this.props.resources, this.props.context.search);
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Go back")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">
              {this.translate('Items I own')}
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {!isReady &&
              <li className="empty-entry">
                <Icon name="spinner"/>
                <p className="processing-text">
                  <Trans>Retrieving your passwords</Trans>
                </p>
              </li>
            }
            {isReady &&
              <React.Fragment>
                {!browsedResources.length &&
                  <li className="empty-entry">
                    <p>
                      {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                      {!isSearching && <Trans>You do not own any passwords yet.
                        It does feel a bit empty here, create your first password.</Trans>}
                    </p>
                  </li>
                }
                {(browsedResources.length > 0) &&
                  browsedResources.map(resource =>
                    <li className="browse-resource-entry" key={resource.id}>
                      <a href="#" onClick={ev => this.handleSelectResourceClick(ev, resource.id)}>
                        <div className="inline-resource-entry">
                          <div className='inline-resource-name'>
                            <span className="title">{resource.metadata.name}</span>
                            <span className="username"> {resource.metadata.username ? `(${resource.metadata.username})` : ""}</span>
                          </div>
                          <span className="url">{resource.metadata.uris?.[0]}</span>
                        </div>
                      </a>
                    </li>
                  )}
              </React.Fragment>
            }
          </ul>
        </div>
        <div className="submit-wrapper">
          <Link to="/webAccessibleResources/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
      </div>
    );
  }
}

FilterResourcesByItemsIOwnPage.propTypes = {
  context: PropTypes.any, // The application context
  resources: PropTypes.array, // the available resources
  // Match, location and history props are injected by the withRouter decoration call.
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourcesLocalStorage(withTranslation('common')(FilterResourcesByItemsIOwnPage))));