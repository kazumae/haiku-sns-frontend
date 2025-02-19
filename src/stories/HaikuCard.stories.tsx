import type { Meta, StoryObj } from '@storybook/react';
import { HaikuCard } from '../components/HaikuCard';

const meta: Meta<typeof HaikuCard> = {
  title: 'Components/HaikuCard',
  component: HaikuCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HaikuCard>;

export const Default: Story = {
  args: {
    first: 'あさがおに',
    middle: 'つるべとられて',
    last: 'もらいみず',
    likes: 42,
  },
};

export const Sample2: Story = {
  args: {
    first: '古池や',
    middle: 'かわずとびこむ',
    last: '水の音',
    likes: 15,
  },
}; 