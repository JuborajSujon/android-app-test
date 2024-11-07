describe("Login Screen Scroll Test on Android", () => {
  it("should scroll down and retrieve locked-out username and password", async () => {
    const usernameInput = await $("~test-Username");
    const passwordInput = await $("~test-Password");
    const loginButton = await $("~test-LOGIN");

    await expect(usernameInput).toBeDisplayed();
    await expect(passwordInput).toBeDisplayed();
    await expect(loginButton).toBeDisplayed();

    driver.pause(1000);

    // First scroll down to locate credentials
    await driver.execute("mobile: scroll", {
      direction: "down",
      strategy: "accessibility id",
      selector: "lockedOutUsername",
    });

    driver.pause(1000);

    const usernameField = await $(
      '//android.widget.TextView[@text="locked_out_user"]'
    );
    const passwordField = await $(
      '//android.widget.TextView[@text="secret_sauce"]'
    );

    // Retrieve locked-out credentials
    const username = await usernameField.getText();
    const password = await passwordField.getText();

    driver.pause(1000);

    // Scroll up to return to login elements
    await driver.execute("mobile: scroll", {
      direction: "up",
      strategy: "accessibility id",
      selector: "test-Username",
    });

    // Input credentials and attempt login
    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await loginButton.click();

    driver.pause(1000);

    const errorMessage = await $(
      '//android.widget.TextView[@text="Sorry, this user has been locked out."]'
    );
    const text = await errorMessage.getText();
    expect(text).toContain("Sorry, this user has been locked out.");
  });
});
