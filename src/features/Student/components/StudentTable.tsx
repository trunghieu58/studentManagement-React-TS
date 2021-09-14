import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/Ctity/citySlice';
import { Student } from 'models';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { capitalizeString, convertCityTest, markColor } from 'utils';

const useStyles = makeStyles({
  table: {},
  highMark: {
    color: '#1a9148',
  },
  lowMark: {
    color: '#f04848',
  },
});

export interface IStudentTableProps {
  studentList: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable(props: IStudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student>({} as Student);
  const { studentList, onEdit, onDelete } = props;
  const match = useRouteMatch();
  const cityList = useAppSelector(selectCityList);

  const handleEdit = (student: Student) => {
    onEdit(student);
    //   console.log(student);
  };

  const OnDeleteClick = (student: Student) => {
    setOpen(true);
    setSelectedStudent(student);
  };
  const handleDeleteConfirm = () => {
    setOpen(false);
    onDelete(selectedStudent);
    toast(`🦄 Delete ${selectedStudent?.name} successfull!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Mark</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{student.id}</TableCell>
                <TableCell align="center" variant="head">
                  {student.name}
                </TableCell>
                <TableCell align="center">{capitalizeString(student.gender)}</TableCell>
                {/* <TableCell align="center">{student.gender}</TableCell> */}
                <TableCell align="center">{convertCityTest(cityList, student.city)}</TableCell>
                <TableCell align="center" style={{ color: markColor(student.mark) }}>
                  {student.mark}
                </TableCell>
                <TableCell align="center">
                  <Link to={`${match.path}/${student.id}`}>
                    <IconButton
                      onClick={() => {
                        handleEdit(student);
                      }}
                      aria-label="edit"
                    >
                      <EditTwoToneIcon color="primary" fontSize="small" />
                    </IconButton>
                  </Link>

                  <IconButton onClick={() => OnDeleteClick(student)} aria-label="delete">
                    <DeleteOutlineIcon color="secondary" fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Student'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this Student???
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleDeleteConfirm}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
