/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Cipherguard SA (https://cipherguard.github.io)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://cipherguard.github.io Cipherguard(tm)
 * @since         4.5.0
 */
import HealthcheckService from "../../services/api/healthcheck/HealthcheckService";
import HealthcheckEntity from "../entity/healthcheck/healthcheckEntity";
/**
 * Model related to the Healthcheck.
 */
class HealthcheckModel {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.healthcheckService = new HealthcheckService(apiClientOptions);
  }

  /**
   * Retrieve the healthcheck data using Cipherguard API.
   *
   * @return {Promise<HealthcheckEntity|null>}
   */
  async getHealthcheckData() {
    try {
      const dto = await this.healthcheckService.fetchHealthcheck();
      return new HealthcheckEntity(dto);
    } catch (error) {
      console.error("Failed to get healthcheck data from the model:", error);
      return null;
    }
  }
}

export default HealthcheckModel;

