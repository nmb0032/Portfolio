'use client';
import React from 'react';
import { Element } from 'react-scroll';

export interface ScrollSectionProps {
  name: string;
  children?: React.ReactNode;
}

export const ScrollSection = ({ children, name }: ScrollSectionProps) => {
  return (
    <Element name={name}>
      <section>{children}</section>
    </Element>
  );
};
