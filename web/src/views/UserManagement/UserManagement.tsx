import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { deleteUser, getAllUsers } from '../../services/userService';
import { User } from '../../types';
import AppSnackbar, { AppSnackbarType } from '../../components/AppSnackbar/AppSnackbar';
import { formatDisplayDate } from '../../utils/DateUtil';
import dayjs from 'dayjs';

type Props = {
  intl: any;
};

const UserManagement = ({ intl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const columns = ['fullName', 'email', 'role', 'address', 'dob'];

  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getUsers = async () => {
    setIsLoading(true);

    await getAllUsers().then(({ data }: any) => {
      setUsers(data);
    });
    setIsLoading(false);
  };

  // trigger on mount - get appointments from one month ago on initialize
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (username: string) => {
    setIsLoading(true);

    await deleteUser(username)
      .then(() => {
        setSnackbarIsOpen(true);
        setSnackbarType('success');
        setMessage(intl.formatMessage({ id: 'userManagement.delete.success' }));
      })
      .catch((error) => {
        console.log({ error });
        setSnackbarIsOpen(false);
        setSnackbarType('error');
        setMessage(intl.formatMessage({ id: 'userManagement.delete.error' }));
      })
      .finally(async () => {
        await getAllUsers()
          .then(({ data }: any) => {
            setUsers(data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid className="main-container">
      <LoadingSpinner isOpen={isLoading} />
      <AppSnackbar
        type={snackbarType as AppSnackbarType}
        message={message}
        open={snackbarIsOpen}
      />{' '}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  {intl.formatMessage({ id: `userManagement.table.header.${column}` })}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: User) => (
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={`${user.username}_${column}`}>
                        {column === 'dob'
                          ? formatDisplayDate(dayjs(user[column as keyof User]).toDate())
                          : user[column as keyof User]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleDelete(user.username);
                        }}
                      >
                        <DeleteOutlined className="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {intl.formatMessage({ id: 'userManagement.table.noData' })}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Grid>
  );
};

export default injectIntl(UserManagement);
