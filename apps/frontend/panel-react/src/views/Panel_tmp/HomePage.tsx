'use client';

import { FC } from 'react';

import PanelLayout from './PanelLayout';
import { TPage } from '../types';

const HomePage: FC<TPage> = ({ h1 }) => {
  return <PanelLayout h1={h1}></PanelLayout>;
};
export default HomePage;
