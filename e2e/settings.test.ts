import { by, device, element, expect, waitFor } from 'detox';

describe('Settings Screen', () => {
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

    await element(by.text('Achievements')).swipe('up', 'slow', 0.5);
    await element(by.text('Settings')).atIndex(0).tap();

    await waitFor(element(by.text('Daily Goal')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show the Settings header with back button', async () => {
    await expect(element(by.text('Settings'))).toBeVisible();
    await expect(element(by.text('\u2039 Back'))).toBeVisible();
  });

  // --- Daily Goal Section ---

  it('should show the Daily Goal section', async () => {
    await expect(element(by.text('Daily Goal'))).toBeVisible();
  });

  it('should show all daily goal options (5, 10, 15, 20, 30, 50)', async () => {
    await expect(element(by.text('5'))).toBeVisible();
    await expect(element(by.text('10'))).toBeVisible();
    await expect(element(by.text('15'))).toBeVisible();
    await expect(element(by.text('20'))).toBeVisible();
    await expect(element(by.text('30'))).toBeVisible();
    await expect(element(by.text('50'))).toBeVisible();
  });

  it('should select a different daily goal', async () => {
    await element(by.text('20')).tap();

    await waitFor(element(by.text('Cards to view per day (currently 20)')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should switch daily goal again', async () => {
    await element(by.text('5')).tap();

    await waitFor(element(by.text('Cards to view per day (currently 5)')))
      .toBeVisible()
      .withTimeout(3000);
  });

  // --- Notifications Section ---

  it('should show the Notifications section', async () => {
    await element(by.text('Daily Goal')).swipe('up', 'slow', 0.3);

    await expect(element(by.text('Notifications'))).toBeVisible();
    await expect(element(by.text('Push Notifications'))).toBeVisible();
    await expect(
      element(by.text('Get notified about new content'))
    ).toBeVisible();
  });

  it('should show Streak Reminders toggle', async () => {
    await expect(element(by.text('Streak Reminders'))).toBeVisible();
    await expect(element(by.text("Don't lose your streak!"))).toBeVisible();
  });

  it('should show Daily Digest toggle', async () => {
    await expect(element(by.text('Daily Digest'))).toBeVisible();
    await expect(
      element(by.text('Morning summary of top cards'))
    ).toBeVisible();
  });

  it('should toggle Push Notifications off and on', async () => {
    const pushNotificationSwitch = element(by.type('RCTSwitch')).atIndex(0);
    await pushNotificationSwitch.tap();
    await pushNotificationSwitch.tap();
  });

  it('should toggle Streak Reminders off', async () => {
    const streakSwitch = element(by.type('RCTSwitch')).atIndex(1);
    await streakSwitch.tap();
  });

  it('should toggle Daily Digest on', async () => {
    const digestSwitch = element(by.type('RCTSwitch')).atIndex(2);
    await digestSwitch.tap();
  });

  // --- About Section ---

  it('should show the About section', async () => {
    await element(by.text('Notifications')).swipe('up', 'slow', 0.3);

    await expect(element(by.text('About'))).toBeVisible();
    await expect(element(by.text('Version'))).toBeVisible();
    await expect(element(by.text('1.0.0'))).toBeVisible();
    await expect(element(by.text('Build'))).toBeVisible();
  });

  // --- Danger Zone ---

  it('should show the Danger Zone section', async () => {
    await expect(element(by.text('Danger Zone'))).toBeVisible();
    await expect(element(by.text('Clear All Data'))).toBeVisible();
  });

  it('should show confirmation alert when Clear All Data is tapped', async () => {
    await element(by.text('Clear All Data')).tap();

    await waitFor(element(by.text('Clear All Data')))
      .toBeVisible()
      .withTimeout(3000);
    await expect(
      element(
        by.text(
          'This will reset your progress, stashes, and all saved data. This cannot be undone.'
        )
      )
    ).toBeVisible();
    await expect(element(by.text('Cancel'))).toBeVisible();
    await expect(element(by.text('Clear Everything'))).toBeVisible();
  });

  it('should dismiss the alert when Cancel is tapped', async () => {
    await element(by.text('Cancel')).tap();

    await expect(element(by.text('Settings'))).toBeVisible();
  });

  it('should navigate back to Profile via back button', async () => {
    await element(by.text('Settings')).swipe('down', 'slow', 0.5);

    await element(by.text('\u2039 Back')).tap();

    await waitFor(element(by.text('Brain Explorer')))
      .toBeVisible()
      .withTimeout(3000);
  });
});
