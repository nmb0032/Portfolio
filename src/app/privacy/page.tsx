import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Nick Belvin | Privacy`,
  description:
    'This site collects no personal information beyond anonymous page-view analytics.',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy</h1>
      <p>
        This site does not collect personal information. It uses Vercel
        Analytics to count anonymous page views, and it does not use advertising
        or tracking cookies.
      </p>
      <p className="subtext">Last updated November 2026.</p>
    </>
  );
}
