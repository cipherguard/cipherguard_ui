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

export default (filter, storage) => new Promise(resolve => {
  storage.local.get(["resources"]).then(({resources}) => {
    const resourcesFiltered = [...resources];
    if (filter?.['is-shared-with-group']) {
      resourcesFiltered.splice(3, 4);
    }
    resolve(resourcesFiltered);
  });
});
