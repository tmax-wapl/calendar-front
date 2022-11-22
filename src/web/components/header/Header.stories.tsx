import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  args: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
