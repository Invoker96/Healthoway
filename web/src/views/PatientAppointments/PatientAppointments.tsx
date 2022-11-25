import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import { getFullName, getUserName, getUserRole } from '../../services/userInfoService';
import { TransitionProps } from '@mui/material/transitions';
import { injectIntl } from 'react-intl';
import { Button, Grid, Typography, TextField, MenuItem, Card } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import './PatientAppointments.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { patientsAppointments } from '../../services/patientService';
import { getSelfAssesmentResult } from '../../services/counsellorService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import moment from 'moment';

type Props = {
  intl: any;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientAppointments = ({ intl }: Props) => {
  interface PatientsColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center' | 'right';
    format?: (value: number) => string;
  }

  interface SelfAssesment {
    question: string;
    answer: string;
  }

  interface Patient {
    patientName: string;
    userName: string;
    appointment: string;
    req: number;
  }

  const patientsColumns: readonly PatientsColumn[] = [
    {
      id: 's_no',
      label: intl.formatMessage({ id: 'global.s_no' }),
      minWidth: 100
    },
    {
      id: 'fullName',
      label: intl.formatMessage({ id: 'patient.name_title' }),
      minWidth: 100
    },
    {
      id: 'userRole',
      label: 'Appointment With',
      minWidth: 250,
      align: 'center'
    },
    {
      id: 'appointment',
      label: 'Appointment Details',
      minWidth: 250,
      align: 'center'
    },
    {
      id: 'self_assessment_title',
      label: '',
      minWidth: 300,
      align: 'center'
    }
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [appointmentsList, setAppointmentsList] = React.useState<Array<Patient>>([]);
  const [selfAssesmentResult, setSelfAssesmentResult] = React.useState<Array<SelfAssesment>>([]);
  const [selectedPatientData, setSelectedPatientData] = React.useState({
    patientName: '',
    userName: '',
    appointment: ''
  });

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date().toISOString()));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleClose = (type: string) => {
    if (type === 'selfAssessment') {
      setOpen(false);
    }
  };

  const handleClickOpen = (selectedPatientDataInfo: any, type: string) => {
    setSelectedPatientData(selectedPatientDataInfo);
    if (type === 'selfAssessment') {
      const payload = {
        username: getUserName()
      };
      getSelfAssesmentResult(payload)
        .then((response: any) => {
          console.log(response.data);
          setSelfAssesmentResult(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
      setOpen(true);
    }
  };

  React.useEffect(() => {
    getMyAppointments();
  }, []);

  function getMyAppointments() {
    const payload = {
      userName: getUserName(),
      userRole: getUserRole()
    };
    patientsAppointments(payload)
      .then((response: any) => {
        console.log(response);
        setAppointmentsList(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleClose('selfAssessment')}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {getFullName()}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleClose('selfAssessment')}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {selfAssesmentResult.length > 0 &&
            selfAssesmentResult.map((selfAssesment, index) => {
              return (
                <ListItem button key={index}>
                  <ListItemText primary={selfAssesment.question} secondary={selfAssesment.answer} />
                </ListItem>
              );
            })}
        </List>
      </Dialog>
      {appointmentsList.length > 0 && (
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
          <Card className="patientAppointment-greeting-container">
            <CalendarMonthIcon />
            <Typography variant="h3">
              {intl.formatMessage(
                {
                  id: 'patient.upcoming_appointment'
                },
                {
                  fullName: getFullName()
                }
              )}
            </Typography>{' '}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {patientsColumns.map((column) => (
                        <TableCell
                          className="patient-appointment-table-header"
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointmentsList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {patientsColumns.map((column) => {
                              const value = (row as any)[column.id];
                              // let date = '';
                              // if (column.id === 'appointment') {
                              //   // date = moment(value).format('MM/DD/YYYY HH:mm');
                              // }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === 's_no' ? index + 1 : value}
                                  {column.id === 'self_assessment_title' && (
                                    <Button
                                      variant="contained"
                                      onClick={() => handleClickOpen(row, 'selfAssessment')}
                                    >
                                      {intl.formatMessage({
                                        id: 'global.self_assessment_title'
                                      })}
                                    </Button>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={appointmentsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      )}
      {appointmentsList.length == 0 && (
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
          <Card className="patientAppointment-greeting-container">
            <CalendarMonthIcon />
            <Typography variant="h3">
              {intl.formatMessage(
                {
                  id: 'patient.upcoming_appointment'
                },
                {
                  fullName: getFullName()
                }
              )}
            </Typography>
            <Typography>
              {intl.formatMessage({
                id: 'patient.no_appointment'
              })}
            </Typography>
          </Card>
        </Grid>
      )}
      <FooterComp />
    </>
  );
};

export default injectIntl(PatientAppointments);
