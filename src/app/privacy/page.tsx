import { Box, Container, Title, Text } from '@mantine/core';

export default function page() {
  return <PrivacyPolicy />;
}

const PrivacyPolicy: React.FC = () => {
  return (
    <Container ta={'center'}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <Title order={1} style={{ marginBottom: '1rem' }}>
          Privacy Policy
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          Your privacy is important to us. It is our policy to respect your
          privacy regarding any information we may collect from you across our
          website, and other sites we own and operate.
        </Text>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Information We Collect
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </Text>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          How We Use Information
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use, or
          modification.
        </Text>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Sharing Information
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          We don’t share any personally identifying information publicly or with
          third parties, except when required to by law.
        </Text>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Your Rights
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </Text>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Contact Us
        </Title>
        <Text style={{ marginBottom: '1rem' }}>
          If you have any questions about how we handle user data and personal
          information, feel free to contact us.
        </Text>
        <Text style={{ marginBottom: '1rem' }}>
          This policy is effective as of November 9th, 2024.
        </Text>
      </Box>
    </Container>
  );
};
