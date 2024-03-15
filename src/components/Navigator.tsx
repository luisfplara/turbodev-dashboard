import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactsIcon from '@mui/icons-material/Contacts';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SavingsIcon from '@mui/icons-material/Savings';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PolicyIcon from '@mui/icons-material/Policy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import GarageIcon from '@mui/icons-material/Garage';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Image } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Link from 'next/link';


const categories = [
    {
        id: 'Workspace',
        children: [
            {
                id: 'Projects',
                icon: <InventoryIcon />,
                link: '/dashboard/workspace/projects',
                active: true,
            },
            { id: 'Backlog', icon: <FormatListNumberedIcon />, link: '/dashboard/workspace/backlog' },
            { id: 'Sprints', icon: <DirectionsRunIcon />, link: '/dashboard/workspace/sprints' },
            { id: 'Tasks', icon: <AssignmentIcon />, link: '/dashboard/workspace/tasks' },
        ],
    },
    {
        id: 'Adminitração',
        children: [
            {
                id: 'Stakeholders',
                icon: <PeopleIcon />,
                link: '/dashboard/administration/stakeholders',
                active: true,
            },
            { id: 'Finances', icon: <SavingsIcon />, link: '/dashboard/administration/finances' },
        ],
    },

];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props: DrawerProps) {
    const { ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>

                    <Box
                        component="img"
                        sx={{
                            height: 50,
                            width: 150,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="Polvilho Três Coqueiros"
                        src="/white_nb_3.png"
                    />

                </ListItem>
                <Link style={{ textDecoration: 'none' }} href={'/'}>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                </Link>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#1f1f1f' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, link, active }) => (
                            <Link key={childId} style={{ textDecoration: 'none' }} href={link||'/'}>
                                <ListItem disablePadding >

                                    <ListItemButton selected={active} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                    </ListItemButton>

                                </ListItem>
                            </Link>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
