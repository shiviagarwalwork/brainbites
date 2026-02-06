import { by, device, element, expect, waitFor } from 'detox';

describe('Tab Navigation', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, delete: true });

    await waitFor(element(by.text('Skip for now')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Skip for now')).tap();

    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should start on the Feed tab', async () => {
    await expect(element(by.text('Streak'))).toBeVisible();
    await expect(element(by.text('XP'))).toBeVisible();
  });

  it('should navigate to the Discover tab', async () => {
    await element(by.text('Discover')).tap();
    await waitFor(element(by.text('Discover')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate to the Create tab', async () => {
    await element(by.text('Create')).tap();
    await waitFor(element(by.text('Create')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate to the Stashes tab', async () => {
    await element(by.text('Stashes')).tap();
    await waitFor(element(by.text('Your saved knowledge')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate to the Profile tab', async () => {
    await element(by.text('Profile')).tap();
    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate back to Feed tab from Profile', async () => {
    await element(by.text('Feed')).tap();
    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should cycle through all tabs in order', async () => {
    await element(by.text('Discover')).tap();
    await waitFor(element(by.text('Discover'))).toBeVisible().withTimeout(3000);

    await element(by.text('Create')).tap();
    await waitFor(element(by.text('Create'))).toBeVisible().withTimeout(3000);

    await element(by.text('Stashes')).tap();
    await waitFor(element(by.text('Your saved knowledge'))).toBeVisible().withTimeout(3000);

    await element(by.text('Profile')).tap();
    await waitFor(element(by.text('Brain Explorer'))).toBeVisible().withTimeout(3000);

    await element(by.text('Feed')).tap();
    await waitFor(element(by.text('Streak'))).toBeVisible().withTimeout(3000);
  });
});
