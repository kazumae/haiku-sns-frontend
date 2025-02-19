import type { Meta, StoryObj } from '@storybook/react';
import { ThemeCard } from '../components/ThemeCard';

const meta: Meta<typeof ThemeCard> = {
  title: 'Components/ThemeCard',
  component: ThemeCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ThemeCard>;

export const Default: Story = {
  args: {
    title: 'お題目',
    content: 'オフィスで起こるあんな事こんな事。',
  },
};

export const Sample2: Story = {
  args: {
    title: 'お題目',
    content: '推しのいる生活。',
  },
}; 