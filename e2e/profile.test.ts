import { by, device, element, expect, waitFor } from 'detox';

describe('Profile Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, delete: true });

    await waitFor(element(by.text('Skip for now')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Skip for now')).tap();

    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Profile')).tap();
    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show the profile header with display name', async () => {
    await expect(element(by.text('Brain Explorer'))).toBeVisible();
  });

  it('should show the level section with Level 1 for a new user', async () => {
    await expect(element(by.text('Level 1'))).toBeVisible();
    await expect(element(by.text('0 XP'))).toBeVisible();
  });

  it('should show the stats grid', async () => {
    await expect(element(by.text('Day Streak'))).toBeVisible();
    await expect(element(by.text('Best Streak'))).toBeVisible();
    await expect(element(by.text('Liked'))).toBeVisible();
    await expect(element(by.text('Saved'))).toBeVisible();
  });

  it("should show Today's Progress section", async () => {
    await expect(element(by.text("Today's Progress"))).toBeVisible();
    await expect(element(by.text('cards viewed'))).toBeVisible();
  });

  it('should show the Achievements section', async () => {
    await expect(element(by.text('Achievements'))).toBeVisible();
    await expect(element(by.text('First Steps'))).toBeVisible();
    await expect(element(by.text('Bookworm'))).toBeVisible();
  });

  it('should show the settings links', async () => {
    await element(by.text('Achievements')).swipe('up', 'slow', 0.5);

    await expect(element(by.text('Settings'))).toBeVisible();
    await expect(element(by.text('Edit Daily Goal'))).toBeVisible();
    await expect(element(by.text('Notifications'))).toBeVisible();
  });

  it('should navigate to Settings screen when Settings link is tapped', async () => {
    await element(by.text('Settings')).atIndex(0).tap();

    await waitFor(element(by.text('Daily Goal')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate back to Profile from Settings', async () => {
    await element(by.text('\u2039 Back')).tap();

    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate to Settings via Edit Daily Goal link', async () => {
    await element(by.text('Achievements')).swipe('up', 'slow', 0.5);

    await element(by.text('Edit Daily Goal')).tap();

    await waitFor(element(by.text('Daily Goal')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.text('\u2039 Back')).tap();
    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should navigate to Settings via Notifications link', async () => {
    await element(by.text('Achievements')).swipe('up', 'slow', 0.5);

    await element(by.text('Notifications')).atIndex(0).tap();

    await waitFor(element(by.text('Push Notifications')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.text('\u2039 Back')).tap();
    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });
});
