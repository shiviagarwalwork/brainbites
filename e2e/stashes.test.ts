import { by, device, element, expect, waitFor } from 'detox';

describe('Stashes Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, delete: true });

    await waitFor(element(by.text('Skip for now')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Skip for now')).tap();

    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Stashes')).tap();

    await waitFor(element(by.text('Your saved knowledge')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show the Stashes header', async () => {
    await expect(element(by.text('Stashes'))).toBeVisible();
    await expect(element(by.text('Your saved knowledge'))).toBeVisible();
  });

  it('should show system stashes (Liked Cards and Saved for Later)', async () => {
    await expect(element(by.text('Library'))).toBeVisible();
    await expect(element(by.text('Liked Cards'))).toBeVisible();
    await expect(element(by.text('Saved for Later'))).toBeVisible();
  });

  it('should show empty state when no custom stashes exist', async () => {
    await expect(element(by.text('Organize your learning'))).toBeVisible();
    await expect(
      element(
        by.text(
          'Create custom stashes to organize cards by topic, project, or any way you like'
        )
      )
    ).toBeVisible();
  });

  it('should show the Create New Stash button', async () => {
    await expect(element(by.text('Create New Stash'))).toBeVisible();
  });

  it('should open the create stash modal', async () => {
    await element(by.text('Create New Stash')).tap();

    await waitFor(element(by.text('New Stash')))
      .toBeVisible()
      .withTimeout(3000);
    await expect(element(by.text('Choose an icon'))).toBeVisible();
    await expect(element(by.text('Cancel'))).toBeVisible();
    await expect(element(by.text('Create'))).toBeVisible();
  });

  it('should type a stash name and create the stash', async () => {
    await element(by.text('New Stash')).swipe('up', 'slow', 0.2);
    await element(by.type('UITextField')).typeText('My Science Notes');

    await element(by.text('Create')).tap();

    await waitFor(element(by.text('My Science Notes')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show the Custom Stashes section after creating one', async () => {
    await expect(element(by.text('Custom Stashes'))).toBeVisible();
    await expect(element(by.text('My Science Notes'))).toBeVisible();
    await expect(element(by.text('0 cards'))).toBeVisible();
  });

  it('should hide empty state after creating a stash', async () => {
    await expect(element(by.text('Organize your learning'))).not.toBeVisible();
  });

  it('should create a second stash', async () => {
    await element(by.text('Create New Stash')).tap();

    await waitFor(element(by.text('New Stash')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.type('UITextField')).typeText('AI Research');
    await element(by.text('Create')).tap();

    await waitFor(element(by.text('AI Research')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should cancel stash creation via Cancel button', async () => {
    await element(by.text('Create New Stash')).tap();

    await waitFor(element(by.text('New Stash')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.type('UITextField')).typeText('Temp Stash');
    await element(by.text('Cancel')).tap();

    await waitFor(element(by.text('New Stash')))
      .not.toBeVisible()
      .withTimeout(3000);
    await expect(element(by.text('Temp Stash'))).not.toBeVisible();
  });
});
