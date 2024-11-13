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
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultProps, noFilteredResourcesProps} from "./FilterResourcesBySharedWithMePage.test.data";
import FilterResourcesBySharedWithMePagePage from "./FilterResourcesBySharedWithMePage.test.page";
import {createMemoryHistory} from "history";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {readPermissionDto, updatePermissionDto} from "../../../shared/models/entity/permission/permissionEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../shared/models/entity/resourceMetadata/resourceMetadataEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FilterResourcesBySharedWithMePage", () => {
  describe("As LU I should see resources I've been shared with", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesBySharedWithMePagePage(defaultProps());
      expect(page.displayedMainMessage).toStrictEqual("Retrieving your passwords");
    });

    it("should display all the resources I've been shared with if there is no search", () => {
      expect.assertions(3);
      const resource1 = defaultResourceDto();
      const resource2 = defaultResourceDto({permission: updatePermissionDto()});
      const resource3 = defaultResourceDto();
      const resource4 = defaultResourceDto({permission: updatePermissionDto()});
      const resources = [resource1, resource2, resource3, resource4];

      const page = new FilterResourcesBySharedWithMePagePage(defaultProps({resources}));

      expect(page.resources?.length).toStrictEqual(2);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource2.metadata.name} (${resource2.metadata.username})${resource2.metadata.uris[0]}`);
    });

    it("should display a message saying that there is no shared resources yet", () => {
      expect.assertions(1);
      const page = new FilterResourcesBySharedWithMePagePage(noFilteredResourcesProps());

      expect(page.displayedMainMessage).toStrictEqual("No passwords are shared with you yet. It does feel a bit empty here, wait for a team member to share a password with you.");
    });

    it("should display shared resources filtered by the search", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Match search"})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "No match"}), permission: updatePermissionDto()});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "No match"})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Match search"}), permission: updatePermissionDto()});
      const resources = [resource1, resource2, resource3, resource4];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesBySharedWithMePagePage(props);

      expect(page.getResource(0).textContent).toStrictEqual(`${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`);
    });

    it("should display a message saying that the search leads to an empty result", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto({metadata: {name: "No match"}});
      const resource2 = defaultResourceDto({metadata: {name: "No match "}});
      const resources = [resource1, resource2];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesBySharedWithMePagePage(props);

      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I can navigate from the 'Shared with me' page", () => {
    it("should allow to go back on the previous page", async() => {
      expect.assertions(3);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: [
          "/home",
          "/test"
        ],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new FilterResourcesBySharedWithMePagePage(props);

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
    });

    it("should allow to navigate to a selected resource page", async() => {
      expect.assertions(4);

      const resource = defaultResourceDto({
        permission: readPermissionDto(),
      });
      const resources = [resource];

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "Cipherguard",
        }),
        resources: resources
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesBySharedWithMePagePage(props);

      await page.clickOnResource(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`);
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
      expect(props.context.searchHistory).toStrictEqual({'/': "Cipherguard"});
    });

    it("should initialised search from history", async() => {
      expect.assertions(2);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {
            "/webAccessibleResources/quickaccess/resources/shared-with-me": "test",
          }
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: [
          "/webAccessibleResources/quickaccess/resources/shared-with-me",
        ],
      });

      props.history.goBack();

      const page = new FilterResourcesBySharedWithMePagePage(props);

      await page.clickOnBackButton();

      expect(props.context.updateSearch).toHaveBeenCalledTimes(2);
      expect(props.context.updateSearch).toHaveBeenCalledWith("test");
    });
  });
});