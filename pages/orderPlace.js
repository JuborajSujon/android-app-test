describe("Order Place SuccessFull", () => {
  it("", async () => {
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
      '//android.widget.TextView[@text="standard_user"]'
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

    driver.pause(3000);

    // Assert successful login

    const productPage = await $('//android.widget.TextView[@text="PRODUCTS"]');
    const text = await productPage.getText();
    expect(text).toContain("PRODUCTS");

    //  Select filter button in top right corner and select Price (low to high)
    const filterButton = await $(
      '//android.view.ViewGroup[@content-desc="test-Modal Selector Button"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView'
    );
    await filterButton.click();
    await driver.pause(1000);

    const priceLowToHigh = await $(
      '//android.widget.TextView[@text="Price (low to high)"]'
    );
    await priceLowToHigh.click();
    await driver.pause(1000);

    // Scroll down to find the product "Sauce Labs Fleece Jacket"
    await driver.execute("mobile: scroll", {
      direction: "down",
      strategy: "-android uiautomator",
      selector: 'new UiSelector().text("Sauce Labs Fleece Jacket")',
    });

    driver.pause(3000);

    //Get price of the product “Sauce Labs Fleece Jacket”

    const sauceLabsFleeceJacketElement = await $(
      '//android.widget.TextView[@content-desc="test-Price" and @text="$49.99"]'
    );

    const sauceLabsFleeceJacketPrice =
      await sauceLabsFleeceJacketElement.getText();

    expect(sauceLabsFleeceJacketPrice).toBe("$49.99");

    await driver.pause(2000);

    // Click on “ADD TO CART” button for product “Sauce Labs Fleece Jacket”

    const sauceLabsFleeceJacketName = await $(
      '//android.widget.TextView[@content-desc="test-Item title" and @text="Sauce Labs Fleece Jacket"]'
    );

    const sauceLabsFleeceJacketNameText =
      await sauceLabsFleeceJacketName.getText();

    await expect(sauceLabsFleeceJacketNameText).toBe(
      "Sauce Labs Fleece Jacket"
    );

    // const addToCartButton = await sauceLabsFleeceJacketNameText.$(
    //   './ancestor::android.view.ViewGroup//android.view.ViewGroup[@content-desc="test-ADD TO CART"]'
    // );

    // await addToCartButton.click();

    await driver.pause(2000);

    //
  });
});
