/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultUserAppContext} from "../../../react-extension/contexts/ExtAppContext.test.data";
import {
  defaultPasswordExpirySettingsContext
} from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import {
  overridenPasswordExpirySettingsEntityDto
} from "../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {
  defaultPasswordPoliciesContext
} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPasswordPoliciesDto} from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

export function defaultAppContext(appContext) {
  const defaultAppContext = defaultUserAppContext();
  return Object.assign(defaultAppContext, appContext || {});
}

export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.appContext),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({
      getSettings: () => overridenPasswordExpirySettingsEntityDto()
    }),
    passwordPoliciesContext: defaultPasswordPoliciesContext({
      getPolicies: jest.fn(() => defaultPasswordPoliciesDto())
    }),
  };
  return Object.assign(defaultProps, props);
}


export function mockExtensionCall(context) {
  context.port.addRequestListener("cipherguard.resources.create", () => {});

  context.port.addRequestListener("cipherguard.quickaccess.prepare-autosave", () => ({
    name: "",
    uri: "",
    username: "",
    secret_clear: ""
  }));

  context.port.addRequestListener("cipherguard.secrets.powned-password", value => {
    if (value === "hello-world") {
      return 3;
    } else if (value === "unavailable") {
      throw new Error("Service is unavailable");
    }
    return 0;
  });
}

export function mockExtensionCallWithTabInfo(context) {
  mockExtensionCall(context);
  context.port.addRequestListener("cipherguard.quickaccess.prepare-autosave", () => ({
    name: "test",
    uri: "www.test.com",
    username: "test@cipherguard.com",
    secret_clear: "test@cipherguard.com"
  }));
}
