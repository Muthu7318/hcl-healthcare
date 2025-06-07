const Attendance=()=>{
return (
<Grid container spacing={3}>
          {/* Recent Attendance */}
          <Grid item xs={12} lg={8}>
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
          </Grid>
        </Grid>)
        };

        export default Attendance