import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  People,
  CheckCircle,
  Schedule,
  EventNote,
  TrendingUp,
  TrendingDown,
  AccessTime,
  Visibility,
  Edit,
  Add,
} from '@mui/icons-material';
import SimpleLayout from './simpleLayout';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced dashboard stats
  const dashboardStats = [
    {
      title: 'Total Staff',
      value: '234',
      change: '+12',
      trend: 'up',
      icon: <People />,
      color: '#2563eb',
      bgColor: '#eff6ff',
      description: 'Active employees',
    },
    {
      title: 'Present Today',
      value: '198',
      change: '+5%',
      trend: 'up',
      icon: <CheckCircle />,
      color: '#10b981',
      bgColor: '#f0fdf4',
      description: '84.6% attendance',
    },
    {
      title: 'On Leave',
      value: '12',
      change: '-2',
      trend: 'down',
      icon: <EventNote />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'Approved leaves',
    },
    {
      title: 'Late Arrivals',
      value: '15',
      change: '+3',
      trend: 'up',
      icon: <Schedule />,
      color: '#ef4444',
      bgColor: '#fef2f2',
      description: 'Need attention',
    },
  ];

  // Recent attendance data
  const recentAttendance = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '/api/placeholder/32/32',
      department: 'Cardiology',
      checkIn: '08:45 AM',
      status: 'Present',
      shift: 'Morning',
    },
    {
      id: 2,
      name: 'Nurse Emily Davis',
      avatar: '/api/placeholder/32/32',
      department: 'Emergency',
      checkIn: '07:00 AM',
      status: 'Present',
      shift: 'Morning',
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      avatar: '/api/placeholder/32/32',
      department: 'Neurology',
      checkIn: '09:15 AM',
      status: 'Late',
      shift: 'Morning',
    },
    {
      id: 4,
      name: 'Tech. Lisa Brown',
      avatar: '/api/placeholder/32/32',
      department: 'Radiology',
      checkIn: '-',
      status: 'Absent',
      shift: 'Morning',
    },
    {
      id: 5,
      name: 'Dr. Robert Wilson',
      avatar: '/api/placeholder/32/32',
      department: 'Orthopedics',
      checkIn: '08:30 AM',
      status: 'Present',
      shift: 'Morning',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'success';
      case 'Late': return 'warning';
      case 'Absent': return 'error';
      default: return 'default';
    }
  };

  return (
    <SimpleLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Welcome back! Here's what's happening at HCL Healthcare today.
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
              {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={stat.change}
                          size="small"
                          color={stat.trend === 'up' ? 'success' : 'error'}
                          icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Attendance */}
          {/* <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      Today's Attendance
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Real-time attendance tracking
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    startIcon={<Add />}
                    size="small"
                  >
                    Mark Attendance
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Check-in</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Shift</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentAttendance.map((record) => (
                        <TableRow key={record.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                src={record.avatar} 
                                sx={{ width: 32, height: 32 }}
                              >
                                {record.name.charAt(0)}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {record.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                              {record.department}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {record.checkIn}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={record.shift} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={record.status}
                              size="small"
                              color={getStatusColor(record.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" sx={{ mr: 1 }}>
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <Edit fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </SimpleLayout>
  );
};

export default Dashboard;
