import React from 'react';
import Logo from './Logo';
import { Typography } from '@material-ui/core';

const Branding = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#15202B',
    color: '#E9F0FE',
    paddingTop: '2%',
  }}>
    <Logo color="#E9F0FE" />
    <Typography variant="h3">Shelf</Typography><br />
    <Typography variant="subtitle1">A PERSONAL DIGITAL BOOKSHELF</Typography>
  </div>
);

export default Branding;
