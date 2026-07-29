import HeaderSection from '@/components/HomePage/Header';
import { Navbar } from '@/components/shared/navbar';
import React from 'react';
const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeaderSection></HeaderSection>
    </div>
  );
};

export default page;