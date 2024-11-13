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
 * @since         3.0.0
 */

import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";

export default (resourceId, tagsDto, storage) => {
  return new Promise(async (resolve) => {
    const {resources} = await storage.local.get(["resources"]);
    const resourceIndex = resources.findIndex(item => item.id === resourceId);
    const resource = resources[resourceIndex];
    tagsDto.forEach(function (tag) {
      if(!tag.id) {
        tag.id = uuidv4();
      }
    });
    resource.modified = DateTime.now().toISO();
    resource.modified_by = "f848277c-5398-58f8-a82a-72397af2d450";
    resource.tags = tagsDto;
    resources[resourceIndex] = resource;
    await storage.local.set({resources});
    resolve(resource);
  });
};
