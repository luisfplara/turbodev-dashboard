'use client'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import NavBar from '@/components/NavBar';
import { Box, Container, Link, Typography, useMediaQuery } from '@mui/material';
import Navigator from '@/components/Navigator';
import Content from '@/components/Content';
import Header from '@/components/Header';

const drawerWidth = 256;



export default function RootLayout(props: { children: React.ReactNode, name: string }) {


    return (
        <Box sx={{ backgroundColor: 'red' }}  >
            {props.children}
        </Box>
    );
}
