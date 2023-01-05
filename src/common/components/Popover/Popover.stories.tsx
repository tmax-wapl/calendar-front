import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Popover from './Popover';
import { PopoverData } from './Popover.data';
import PopOverProps from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  args: {},
} as ComponentMeta<typeof PopOverProps>;

const Template: ComponentStory<typeof Popover> = args => <Popover {...args} />;

export const Story = Template.bind({});
Story.args = { moreLinkData: { position: PopoverData.position, date: PopoverData.date } };
// TODO:// 다시 수정 필요
