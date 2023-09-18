import { ComponentMeta } from '@storybook/react';
import Compo from './Popover';
import { PopoverData } from './Popover.data';
import PopOverProps from './Popover';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Calendar/Popover',
  component: Compo,
  args: {},
} as ComponentMeta<typeof PopOverProps>;

const Popover = args => <Popover {...args} />;
