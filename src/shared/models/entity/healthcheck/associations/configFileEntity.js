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
import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "configFile";

class ConfigFileEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(
      ConfigFileEntity.ENTITY_NAME,
      dto,
      ConfigFileEntity.getSchema()
    ), options);
  }

  static getSchema() {
    return {
      "type": "object",
      "required": ["app", "cipherguard"],
      "properties": {
        "app": {"type": "boolean"},
        "cipherguard": {"type": "boolean"}
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get app() {
    return this._props.app;
  }

  get cipherguard() {
    return this._props.cipherguard;
  }

  /*
   *==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default ConfigFileEntity;
