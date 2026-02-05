import { Redirect } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

export default function Index() {
  const { isOnboarded } = useUserStore();

  // Redirect based on onboarding status
  if (isOnboarded) {
    return <Redirect href="/(tabs)/feed" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
