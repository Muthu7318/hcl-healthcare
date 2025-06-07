import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Avatar,
  Badge,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  People,
  AccessTime,
  Schedule,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  Group,
  CheckCircle,
  Cancel,
  EventNote,
  CalendarToday,
  Assignment,
  WorkOff,
  Settings,
  Help,
  ExitToApp,
  Business,
  AdminPanelSettings,
  Timeline,
  Today,
  ViewWeek,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice';

const drawerWidth = 280;

const Sidebar = ({ open, onClose, variant = 'temporary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [openMenus, setOpenMenus] = useState({
    staff: false,
    attendance: false,
    scheduler: false,
    reports: false,
  });

  const handleMenuToggle = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
      badge: null,
    },
    {
      title: 'Staff Management',
      icon: <People />,
      submenu: 'staff',
      badge: '',
      children: [
        { 
          title: 'Staff List', 
          icon: <People />, 
          path: '/staff',
          description: 'Check staff availability'
        },
        { 
          title: 'Add Staff', 
          icon: <People />, 
          path: '/createstaff',
          description: 'create staff'
        },
        { 
          title: 'Shift Scheduler', 
          icon: <Assignment />, 
          path: '/scheduler',
          description: 'Reusable shift patterns'
        },
          { 
          title: 'View Shift', 
          icon: <Assignment />, 
          path: '/viewSifts',
          description: 'Reusable shift patterns'
        },
        { 
          title: 'Mark ttendance', 
          icon: <EventNote />, 
          path: '/dashboard',
          description: 'Manual attendance entry'
        },
       { 
          title: 'Export Data', 
          icon: <EventNote />, 
          path: '/reports',
          description: 'Download reports'
        }
      ],
    },
     
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            bgcolor: '#2563eb',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}
        >
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            H
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
          HCL Healthcare
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
          Attendance Portal
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Avatar
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: '#10b981',
              fontSize: '0.875rem'
            }}
            src={user?.avatar}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
              {user?.name || 'Admin User'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {user?.role || 'Administrator'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => 
                    item.submenu 
                      ? handleMenuToggle(item.submenu)
                      : handleNavigation(item.path)
                  }
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive(item.path) 
                      ? '#e0f2fe' 
                      : 'transparent',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                    },
                    color: isActive(item.path) ? '#0277bd' : '#475569',
                    py: 1.5,
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: 'inherit', 
                    minWidth: 40,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive(item.path) ? 600 : 500,
                    }}
                  />
                  {item.badge && (
                    <Badge
                      badgeContent={item.badge}
                      color={item.badgeColor || 'primary'}
                      sx={{ mr: 1 }}
                    />
                  )}
                  {item.submenu && (
                    openMenus[item.submenu] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>

              {/* Submenu Items */}
              {item.submenu && (
                <Collapse in={openMenus[item.submenu]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ ml: 1, mb: 1 }}>
                    {item.children.map((child) => (
                      <ListItem key={child.title} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                          onClick={() => handleNavigation(child.path)}
                          sx={{
                            borderRadius: 1.5,
                            bgcolor: isActive(child.path) 
                              ? '#e3f2fd' 
                              : 'transparent',
                            '&:hover': {
                              bgcolor: '#f8fafc',
                            },
                            color: isActive(child.path) ? '#1565c0' : '#64748b',
                            py: 1,
                            pl: 2,
                          }}
                        >
                          <ListItemIcon sx={{ 
                            color: 'inherit', 
                            minWidth: 32,
                          }}>
                            {child.icon}
                          </ListItemIcon>
                          <Box sx={{ flex: 1 }}>
                            <ListItemText 
                              primary={child.title}
                              secondary={child.description}
                              primaryTypographyProps={{
                                fontSize: '0.8rem',
                                fontWeight: isActive(child.path) ? 600 : 500,
                              }}
                              secondaryTypographyProps={{
                                fontSize: '0.7rem',
                                color: '#94a3b8',
                              }}
                            />
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}

          <Divider sx={{ my: 2 }} />
        </List>
      </Box>

           {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip 
            label="Online" 
            size="small" 
            color="success" 
            sx={{ fontSize: '0.7rem' }}
          />
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            v2.0.1
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center', display: 'block' }}>
          © 2024 HCL Healthcare Portal
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'white',
          borderRight: '1px solid #e2e8f0',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
