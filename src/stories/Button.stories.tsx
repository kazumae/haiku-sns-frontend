import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '知る',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'primary',
    children: '詠む',
  },
};

export const WithShiruIcon: Story = {
  args: {
    variant: 'primary',
    children: '知る',
    icon: 'shiru',
  },
};

export const WithYomuIcon: Story = {
  args: {
    variant: 'primary',
    children: '詠む',
    icon: 'yomu',
  },
}; 