import { Section } from '@/app/components/Section';
import {
  Card,
  CardSection,
  Group,
  Badge,
  Button,
  Image,
  Text,
  SimpleGrid,
} from '@mantine/core';

export const Hobbies: React.FC = () => {
  return (
    <Section title="My Hobbies">
      <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }}>
        <RowingCard />
        <SkiingCard />
        <HikingCard />
      </SimpleGrid>
    </Section>
  );
};

const SkiingCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection>
        <Image src="/images/skiing.jpg" height={250} alt="Skiing Image" />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Skiing ⛷️</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {`Skiing has been a great hobby that I share with my family.`}
      </Text>
    </Card>
  );
};

const RowingCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection>
        <Image
          src="/images/rowing-nationals.jpg"
          height={250}
          alt="Rowing Image"
        />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Rowing 🚣‍♂️</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {`I have been rowing since high school and have competed in hundreds of
        regattas across the country. When I'm not coding you can find me on the
        water 3 - 5 times a week.`}
      </Text>
    </Card>
  );
};

const HikingCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection>
        <Image src="/images/hiking.jpg" height={250} alt="Hiking image" />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Hiking 🗻</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {`Hiking is a great pass time that I like to do with my friends!`}
      </Text>
    </Card>
  );
};
