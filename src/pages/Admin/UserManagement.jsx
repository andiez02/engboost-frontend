import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Chip,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API data later
const mockUsers = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    fullName: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'user',
    isActive: true,
    createdAt: '2024-03-15',
    lastLogin: '2024-03-20',
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    fullName: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'user',
    isActive: false,
    createdAt: '2024-03-14',
    lastLogin: '2024-03-19',
  },
  // Add more mock users as needed
];

function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    setSelectedRole('');
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = () => {
    // Handle edit submission
    console.log('Updating role to:', selectedRole);
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    // Handle delete confirmation
    handleDeleteClose();
  };

  const handleAddClick = () => {
    // Handle add user click
    console.log('Adding new user');
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Add Button */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm người dùng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ minWidth: 160 }}
        >
          Thêm người dùng
        </Button>
      </Box>

      {/* User Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Người dùng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Đăng nhập cuối</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatar} alt={user.fullName} />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {user.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'admin' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                      size="small"
                      color={user.isActive ? 'success' : 'warning'}
                      icon={
                        user.isActive ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          <BlockIcon fontSize="small" />
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Chỉnh sửa vai trò">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(user)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Chỉnh sửa vai trò người dùng</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box
              sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Người dùng
                </Typography>
                <Typography variant="body1">
                  {selectedUser.fullName} (@{selectedUser.username})
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{selectedUser.email}</Typography>
              </Box>
              <FormControl fullWidth>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  value={selectedRole}
                  label="Vai trò"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <MenuItem value="user">Người dùng</MenuItem>
                  <MenuItem value="admin">Quản trị viên</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Hủy</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={selectedRole === selectedUser?.role}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa người dùng {selectedUser?.fullName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Hủy</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserManagement;
