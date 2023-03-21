import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EventHeader from './EventHeader';

export default {
  title: 'Components/EventHeader',
  component: EventHeader,
  args: {},
} as ComponentMeta<typeof EventHeader>;

const Template: ComponentStory<typeof EventHeader> = args => (
  <MemoryRouter>
    <EventHeader {...args} />
  </MemoryRouter>
);

export const Story = Template?.bind({});
Story.args = {};
