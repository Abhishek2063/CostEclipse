import config from "../config/env.config";

describe("Environment Config", () => {
  it("should load all required environment variables", () => {
    expect(config.NODE_ENV).toBeDefined();
    expect(config.PORT).toBeGreaterThan(0);
    expect(config.DB_HOST).toBeTruthy();
    expect(config.DB_USER).toBeTruthy();
    expect(config.DB_PASS).toBeTruthy();
    expect(config.DB_NAME).toBeTruthy();
  });
});
