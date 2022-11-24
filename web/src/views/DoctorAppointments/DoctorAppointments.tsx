import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import { getUserName, getUserRole } from '../../services/userInfoService';
import { TransitionProps } from '@mui/material/transitions';
import { injectIntl } from 'react-intl';
import { Button, Grid, Typography, TextField, MenuItem } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import {
  myAppointments,
  getSelfAssesmentResult,
  removePatient
} from '../../services/doctorService';
import dayjs, { Dayjs } from 'dayjs';
import { Link } from 'react-router-dom';
import './DoctorAppointments.scss';
import FooterComp from '../../components/FooterComp/FooterComp';

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

const DoctorAppointments = ({ intl }: Props) => {
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
      minWidth: 30
    },
    {
      id: 'patientName',
      label: intl.formatMessage({ id: 'global.patient_name_title' }),
      minWidth: 120
    },
    {
      id: 'self_assessment_title',
      label: '',
      minWidth: 200,
      align: 'center'
    },
    {
      id: 'appointment',
      label: 'Appointment',
      minWidth: 200,
      align: 'center'
    },
    {
      id: 'comments',
      label: 'Comments',
      minWidth: 200,
      align: 'center'
    },
    {
      id: 'reject',
      label: '',
      minWidth: 80,
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

  React.useEffect(() => {
    getMyAppointments();
  }, []);

  function getMyAppointments() {
    const payload = {
      userName: getUserName(),
      userRole: getUserRole()
    };
    myAppointments(payload)
      .then((response: any) => {
        console.log(response);
        setAppointmentsList(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const handleClickOpen = (selectedPatientDataInfo: any, type: string) => {
    setSelectedPatientData(selectedPatientDataInfo);
    if (type === 'selfAssessment') {
      const payload = {
        username: selectedPatientDataInfo.userName
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

  const handleClose = (type: string) => {
    if (type === 'selfAssessment') {
      setOpen(false);
    }
  };

  const handleRemoveClickOpen = (selectedPatientDataInfo: any) => {
    console.log(selectedPatientDataInfo);
    setSelectedPatientData(selectedPatientDataInfo);
    setOpenRemoveDialog(true);
  };

  const handleRemovePatient = () => {
    console.log(selectedPatientData);
    const payload = {
      username: selectedPatientData.userName
    };
    removePatient(payload)
      .then((response) => {
        console.log(response);
        getMyAppointments();
        setOpenRemoveDialog(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenRemoveDialog(false);
      });
  };

  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };

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
        open={openRemoveDialog}
        onClose={handleRemoveDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{'Do you want to remove patient?'}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove the patient {selectedPatientData?.patientName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveDialogClose}>Disagree</Button>
          <Button onClick={handleRemovePatient} color="error" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
              {selectedPatientData?.patientName}
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
      <MenuBar
        title={intl.formatMessage({
          id: 'doctor.title'
        })}
        noBtn={false}
      />
      <Grid sx={{ mt: 5 }}>
        <Grid container justifyContent="center">
          <Typography
            variant="h3"
            sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'left' } }}
            style={{ margin: '20px' }}
          >
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </Typography>
        </Grid>
        <Grid container justifyContent="space-around">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {appointmentsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {patientsColumns.map((column) => {
                            const value = (row as any)[column.id];
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

                                {column.id === 'reject' && (
                                  <Typography
                                    variant="h3"
                                    onClick={() => handleRemoveClickOpen(row)}
                                  >
                                    {intl.formatMessage({
                                      id: 'global.reject'
                                    })}
                                  </Typography>
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
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(DoctorAppointments);
