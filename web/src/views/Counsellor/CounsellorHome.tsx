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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { injectIntl } from 'react-intl';
import { Button, Grid, Typography, TextField } from '@mui/material';
import './CounsellorHome.scss';
import MenuBar from '../../components/MenuBar/MenuBar';
import {
  listOfPatient,
  getSelfAssesmentResult,
  removePatient
} from '../../services/counsellorService';
import Footer from '../../components/Footer/Footer';
import './CounsellorHome.scss';

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

const CounsellorHome = ({ intl }: Props) => {
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
      id: 'self_assign',
      label: '',
      minWidth: 170,
      align: 'center'
    },
    {
      id: 'doctor_assign',
      label: '',
      minWidth: 170,
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
  const [patientsList, setPatientsList] = React.useState([]);
  const [selfAssesmentResult, setSelfAssesmentResult] = React.useState<Array<SelfAssesment>>([]);
  const [selectedPatientData, setSelectedPatientData] = React.useState({
    patientName: '',
    userName: ''
  });

  React.useEffect(() => {
    getListOfPatient();
  }, []);

  function getListOfPatient() {
    listOfPatient()
      .then((response: any) => {
        console.log(response);
        setPatientsList(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const handleClickOpen = (selectedPatientDataInfo: any) => {
    const payload = {
      username: selectedPatientDataInfo.userName
    };
    setSelectedPatientData(selectedPatientDataInfo);
    getSelfAssesmentResult(payload)
      .then((response: any) => {
        console.log(response.data);
        setSelfAssesmentResult(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        getListOfPatient();
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

  // const PATIENTS_DATA = [
  //   {
  //     patientName: 'Altouf',
  //     assessment_form: 'text'
  //   },
  //   {
  //     patientName: 'Haider',
  //     assessment_form: 'text'
  //   },
  //   {
  //     patientName: 'Dalie',
  //     assessment_form: 'text'
  //   },
  //   {
  //     patientName: 'Ray',
  //     assessment_form: 'text'
  //   },
  //   {
  //     patientName: 'Jack',
  //     assessment_form: 'text'
  //   },
  //   {
  //     patientName: 'Oliver',
  //     assessment_form: 'text'
  //   }
  // ];

  // const tableRows = PATIENTS_DATA.map((info, index) => {
  //   return (
  //     <tr>
  //       <td>{index + 1}</td>
  //       <td>{info.patientName}</td>
  //       <td>
  //         {' '}
  //         <Button variant="contained">
  //           {intl.formatMessage({
  //             id: 'global.self_assessment_title'
  //           })}
  //         </Button>
  //       </td>
  //       <td>
  //         {' '}
  //         <Button variant="contained">
  //           {intl.formatMessage({
  //             id: 'counsellor.self_assign'
  //           })}
  //         </Button>
  //       </td>
  //       <td>
  //         {' '}
  //         <Button variant="contained">
  //           {intl.formatMessage({
  //             id: 'counsellor.doctor_assign'
  //           })}
  //         </Button>
  //       </td>
  //       <td>
  //         <Typography variant="h3">
  //           {intl.formatMessage({
  //             id: 'global.reject'
  //           })}
  //         </Typography>
  //       </td>
  //     </tr>
  //   );
  // });

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
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedPatientData?.patientName}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
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
        isCustomView
        title={intl.formatMessage({
          id: 'counsellor.title'
        })}
      />
      <Grid sx={{ mt: 20 }}>
        <Grid container justifyContent="center">
          <Typography
            variant="h1"
            sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
            style={{ margin: '20px' }}
          >
            <u>
              {intl.formatMessage({
                id: 'global.list_of_patients'
              })}
            </u>
          </Typography>
          <Button variant="contained" className="my_appointment_btn">
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </Button>
        </Grid>
        <Grid container justifyContent="space-around">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {patientsColumns.map((column) => (
                      <TableCell
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
                  {patientsList
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
                                  <Button variant="contained" onClick={() => handleClickOpen(row)}>
                                    {intl.formatMessage({
                                      id: 'global.self_assessment_title'
                                    })}
                                  </Button>
                                )}
                                {column.id === 'self_assign' && (
                                  <Button variant="contained">
                                    {intl.formatMessage({
                                      id: 'counsellor.self_assign'
                                    })}
                                  </Button>
                                )}
                                {column.id === 'doctor_assign' && (
                                  <Button variant="contained">
                                    {intl.formatMessage({
                                      id: 'counsellor.doctor_assign'
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
                                {/* {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value} */}
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
              count={patientsList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  );
};

export default injectIntl(CounsellorHome);
