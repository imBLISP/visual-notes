import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
// import 'tailwindcss/tailwind.css'
 
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
  args: {
    appName: 'Button',
    children: 'I am a primary button.',
  },
};