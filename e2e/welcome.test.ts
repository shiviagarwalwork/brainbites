import { by, device, element, expect, waitFor } from 'detox';

describe('Welcome / Onboarding Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, delete: true });
  });

  it('should show the welcome screen with app name and tagline', async () => {
    await expect(element(by.text('BrainBites'))).toBeVisible();
    await expect(element(by.text('Get smarter in 5 minutes a day'))).toBeVisible();
  });

  it('should show the three feature items', async () => {
    await expect(element(by.text('Bite-sized knowledge'))).toBeVisible();
    await expect(element(by.text('Personalized feed'))).toBeVisible();
    await expect(element(by.text('Gamified learning'))).toBeVisible();
  });

  it('should show Get Started and Skip buttons', async () => {
    await expect(element(by.text('Get Started'))).toBeVisible();
    await expect(element(by.text('Skip for now'))).toBeVisible();
  });

  it('should navigate to interest selection when Get Started is tapped', async () => {
    await element(by.text('Get Started')).tap();
    await expect(element(by.text('What interests you?'))).toBeVisible();
  });

  it('should enable Continue after selecting 3+ interests and navigate to feed', async () => {
    await element(by.text('Neuroscience')).tap();
    await element(by.text('Psychology')).tap();
    await element(by.text('AI & Technology')).tap();

    await element(by.text('Continue (3/3+)')).tap();

    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should allow skipping onboarding entirely', async () => {
    await device.launchApp({ newInstance: true, delete: true });
    await expect(element(by.text('BrainBites'))).toBeVisible();
    await element(by.text('Skip for now')).tap();

    await waitFor(element(by.text('Streak')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
