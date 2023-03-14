import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CalendarHeader from './CalendarHeader';

export default {
  title: 'Components/CalendarHeader',
  component: CalendarHeader,
  args: {},
} as ComponentMeta<typeof CalendarHeader>;

const Template: ComponentStory<typeof CalendarHeader> = args => (
  <MemoryRouter>
    <CalendarHeader {...args} />
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
