import { redirect } from 'next/navigation';
import { redirects } from './lib/constants/redirects';

export default function page() {
  redirect(redirects.home);
}
