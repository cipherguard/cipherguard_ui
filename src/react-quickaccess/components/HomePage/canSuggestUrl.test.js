import canSuggestUrl from "./canSuggestUrl";

describe("canSuggestUrl", () => {
  it("should suggest matching domain urls", () => {
    expect(canSuggestUrl("ssh://www.cipherguard.com", "ssh://www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("http://www.cipherguard.com", "http://www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("ftp://www.cipherguard.com", "ftp://www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("https://cipherguard.github.io", "https://cipherguard.github.io")).toBe(true);
    expect(canSuggestUrl("https://cipherguard.github.io:443", "https://cipherguard.github.io:443")).toBe(true);
    expect(canSuggestUrl("https://email", "https://email")).toBe(true);
  });

  it("should suggest matching international domain urls", () => {
    expect(canSuggestUrl(new URL("https://àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ.com").origin,
      "https://àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ.com")).toBe(true);
    expect(canSuggestUrl(new URL("https://الش.com").origin, "https://الش.com")).toBe(true);
    expect(canSuggestUrl(new URL("https://Ид.com").origin, "https://Ид.com")).toBe(true);
    expect(canSuggestUrl(new URL("https://完善.com").origin, "https://完善.com")).toBe(true);
  });

  it("should suggest matching IPv4 and IPv6 urls", () => {
    expect(canSuggestUrl("ssh://[0:0:0:0:0:0:0:1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(true);
    expect(canSuggestUrl("ssh://127.0.0.1", "ssh://127.0.0.1")).toBe(true);
    expect(canSuggestUrl("http://[0:0:0:0:0:0:0:1]", "http://[0:0:0:0:0:0:0:1]")).toBe(true);
    expect(canSuggestUrl("http://127.0.0.1", "http://127.0.0.1")).toBe(true);
    expect(canSuggestUrl("ftp://[0:0:0:0:0:0:0:1]", "ftp://[0:0:0:0:0:0:0:1]")).toBe(true);
    expect(canSuggestUrl("ftp://127.0.0.1", "ftp://127.0.0.1")).toBe(true);
    expect(canSuggestUrl("https://[0:0:0:0:0:0:0:1]", "https://[0:0:0:0:0:0:0:1]")).toBe(true);
    expect(canSuggestUrl("https://127.0.0.1", "https://127.0.0.1")).toBe(true);
    expect(canSuggestUrl("https://[0:0:0:0:0:0:0:1]:443", "https://[0:0:0:0:0:0:0:1]:443")).toBe(true);
    expect(canSuggestUrl("https://127.0.0.1:443", "https://127.0.0.1:443")).toBe(true);
  });

  it("should match and suggest short and long forms IPs", () => {
    expect(canSuggestUrl("ssh://[0:0:0:0:0:0:0:1]", "ssh://[::1]")).toBe(true);
    expect(canSuggestUrl("ssh://[::1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(true);
    expect(canSuggestUrl("https://127.1", "https://127.0.0.1")).toBe(true);
    expect(canSuggestUrl("https://127.0.0.1", "https://127.0.1")).toBe(true);
  });

  it("should suggest urls without defined scheme", () => {
    expect(canSuggestUrl("http://127.0.0.1", "127.0.0.1")).toBe(true);
    expect(canSuggestUrl("http://www.cipherguard.com", "www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("https://127.0.0.1", "127.0.0.1")).toBe(true);
    expect(canSuggestUrl("https://cipherguard.github.io", "www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("ftp://127.0.0.1", "127.0.0.1")).toBe(true);
    expect(canSuggestUrl("ftp://www.cipherguard.com", "www.cipherguard.com")).toBe(true);
    expect(canSuggestUrl("ssh://127.0.0.1", "127.0.0.1")).toBe(true);
    expect(canSuggestUrl("ssh://www.cipherguard.com", "www.cipherguard.com")).toBe(true);
  });

  it("should suggest urls without defined port", () => {
    expect(canSuggestUrl("http://127.0.0.1:8080", "127.0.0.1")).toBe(true);
    expect(canSuggestUrl("http://127.0.0.1:4443", "127.0.0.1")).toBe(true);
  });

  it("should suggest url with a parent domain", () => {
    expect(canSuggestUrl("https://cipherguard.github.io", "cipherguard.com")).toBe(true);
    expect(canSuggestUrl("https://cipherguard.github.io", "https://cipherguard.com")).toBe(true);
    expect(canSuggestUrl("https://billing.admin.cipherguard.com", "cipherguard.com")).toBe(true);
  });

  it("shouldn't suggest urls not matching the exact domain", () => {
    expect(canSuggestUrl("https://www.not-cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://bolt.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://pass", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://www.attacker-cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://titan.email", "email")).toBe(false);
    expect(canSuggestUrl("https://email", "http://email")).toBe(false);
    expect(canSuggestUrl("https://titan.email", "https://email")).toBe(false);
  });

  it("shouldn't suggest IPs not matching the exact domain", () => {
    // fake IPs url with a subdomain "fake" trying to phish a suggested IP url.
    expect(canSuggestUrl("https://fake.127.0.0.1", "127.0.0.1")).toBe(false);
    // fake IPs url with a subdomain "127", only composed of digit,  trying to phish a suggested IP url.
    expect(canSuggestUrl("https://127.127.0.0.1", "127.0.0.1")).toBe(false);
    // invalid IPv6 url, one extra digit. The URL primitive throw an exception on this invalid url.
    expect(canSuggestUrl("ssh://[0:0:0:0:0:0:0:0:1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(false);
  });

  it("shouldn't suggest urls with not matching subdomain to parent urls", () => {
    expect(canSuggestUrl("https://cipherguard.com", "www.cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.com", "https://cipherguard.github.io")).toBe(false);
  });

  it("should not suggest urls to an attacker url containing a subdomain looking alike a stored password url", () => {
    expect(canSuggestUrl("https://cipherguard.github.io.attacker.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.github.io-attacker.com", "cipherguard.com")).toBe(false);
  });

  it("should not suggest urls to an attacker url containing a parameter looking alike a stored password url", () => {
    expect(canSuggestUrl("https://attacker.com?cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://attacker.com?cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://attacker.com?url=https://cipherguard.com", "cipherguard.com")).toBe(false);
  });

  it("should not suggest urls to an attacker url containing a hash looking alike a stored password url", () => {
    expect(canSuggestUrl("https://attacker.com#cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://attacker.com#cipherguard.com", "cipherguard.com")).toBe(false);
    expect(canSuggestUrl("https://attacker.com#url=https://cipherguard.com", "cipherguard.com")).toBe(false);
  });

  it("shouldn't suggest urls with a port looking alike a stored password url", () => {
    // This url is not considered valid by the URL primitive.
    expect(canSuggestUrl("https://www.attacker.com:www.cipherguard.com", "cipherguard.com")).toBe(false);
  });

  it("shouldn't suggest IP urls to fake IPs urls", () => {
    expect(canSuggestUrl("https://[::1]", "[::2]")).toBe(false);
    expect(canSuggestUrl("https://[2001:4860:4860::8844]", "[2001:4860:4860::8888]")).toBe(false);
    expect(canSuggestUrl("https://127.0.0.1", "127.0.0.2")).toBe(false);
    expect(canSuggestUrl("https://127.1", "127.2")).toBe(false);
  });

  it("shouldn't suggest urls if the scheme is different", () => {
    expect(canSuggestUrl("http://127.0.0.1", "https://127.0.0.1")).toBe(false);
    expect(canSuggestUrl("https://127.0.0.1", "http://127.0.0.1")).toBe(false);
    expect(canSuggestUrl("http://[::1]", "https://[::1]")).toBe(false);
    expect(canSuggestUrl("https://[::1]", "http://[::1]")).toBe(false);
    expect(canSuggestUrl("http://www.cipherguard.com", "https://cipherguard.github.io")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.github.io", "http://www.cipherguard.com")).toBe(false);

    expect(canSuggestUrl("ftp://[::1]", "ftps://[::1]")).toBe(false);
    expect(canSuggestUrl("ssh://[::1]", "https://[::1]")).toBe(false);
  });

  it("shouldn't suggest urls if the port is different", () => {
    expect(canSuggestUrl("http://127.0.0.1", "127.0.0.1:444")).toBe(false);
    expect(canSuggestUrl("http://www.cipherguard.com", "www.cipherguard.com:444")).toBe(false);
    expect(canSuggestUrl("https://127.0.0.1", "127.0.0.1:80")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.github.io", "www.cipherguard.com:80")).toBe(false);
    expect(canSuggestUrl("https://127.0.0.1:444", "127.0.0.1:443")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.github.io:444", "www.cipherguard.com:443")).toBe(false);

    /*
     * Ports are not deducted from urls schemes, that's why we expect http scheme to not match an url with a defined
     * port, even if it is the correct one.
     */
    expect(canSuggestUrl("http://127.0.0.1", "127.0.0.1:80")).toBe(false);
    expect(canSuggestUrl("https://cipherguard.github.io", "www.cipherguard.com:443")).toBe(false);
  });

  it("shouldn't suggest urls with no hostname to url with no hostname", () => {
    expect(canSuggestUrl("https://no%20identified%20domain%20url.com", "no%20identified%20domain%20url")).toBe(false);
    expect(canSuggestUrl("about:addons", "about:addons")).toBe(false);
    expect(canSuggestUrl("about:addons", "no%20identified%20domain%20url")).toBe(false);
  });
});
