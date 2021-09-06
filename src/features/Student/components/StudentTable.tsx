import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Link, useRouteMatch } from 'react-router-dom';
import { capitalizeString, convertCityTest, markColor } from 'utils';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/Ctity/citySlice';

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
  onDelete: (id: string) => void;
}

export default function StudentTable(props: IStudentTableProps) {
  const classes = useStyles();
  const { studentList, onEdit, onDelete } = props;
  const match = useRouteMatch();
  const cityList = useAppSelector(selectCityList);

  const handleEdit = (student: Student) => {
    onEdit(student);
    //   console.log(student);
  };
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  return (
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
                {index+1}
              </TableCell>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center" variant="head">
                {student.name}
              </TableCell>
              <TableCell align="center">{capitalizeString(student.gender)}</TableCell>
              <TableCell align="center">{convertCityTest(cityList, student.city)}</TableCell>
              <TableCell align="center" style={{ color: markColor(student.mark) }}>
                {student.mark}
              </TableCell>
              <TableCell align="center">
                <Link to={`${match.path}/add`}>
                  <IconButton
                    onClick={() => {
                      handleEdit(student);
                    }}
                    aria-label="edit"
                  >
                    <EditTwoToneIcon color="primary" fontSize="small" />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => {
                    handleDelete(student.id);
                  }}
                  aria-label="delete"
                >
                  <DeleteOutlineIcon color="secondary" fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
