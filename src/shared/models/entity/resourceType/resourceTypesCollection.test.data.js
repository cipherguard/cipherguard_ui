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
 * @since         4.3.0
 */

import {
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordStringDto, resourceTypeTotpDto
} from "./resourceTypeEntity.test.data";
import {v4 as uuidv4} from "uuid";

/**
 * Resource types collection dto.
 * @returns {object}
 */
export const resourceTypesCollectionDto = () => [
  resourceTypePasswordStringDto(),
  resourceTypePasswordAndDescriptionDto(),
  resourceTypePasswordDescriptionTotpDto(),
  resourceTypeTotpDto()
];

/**
 * Build dtos.
 * @param {number} [count=10] The number of dtos.
 * @returns {object}
 */
export const buildDefineNumberOfResourceTypesDtos = (count = 10) => {
  const resourceTypesDto = resourceTypesCollectionDto();
  const dtos = resourceTypesDto;
  for (let i = 0; i < count; i++) {
    const dto = {...resourceTypesDto[i % resourceTypesDto.length]};
    dto.id = uuidv4();
    dto.slug = `${dto.slug} ${i + 1}`;
    dtos.push(dto);
  }
  return dtos;
};
