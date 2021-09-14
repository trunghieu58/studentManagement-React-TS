import { Box, Button } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentsApi';
import { useAppDispatch } from 'app/hooks';
import { Student } from 'models';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentForm from '../components/StudentForm';
import { studentActions } from '../studentSlice';

export interface IAddEditStudentProps {}

export default function AddEditStudent(props: IAddEditStudentProps) {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = React.useState<Student>();
  const dispatch = useAppDispatch();
  // const history = useHistory()

  React.useEffect(() => {
    if (!studentId) return;
    (async () => {
      const data: Student = await studentApi.getStudentById(studentId);
      setStudent(data);
    })();
  }, [studentId]);

  const initialValue = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link
        to="/admin/students"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <Button
          // style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<ChevronLeft />}
        >
          Back
        </Button>
      </Link>
      {Boolean(student) && <h1>{student?.name}</h1>}
      {Boolean(student) && (
        <Box>
          <StudentForm
            initialValue={initialValue}
            onSubmit={(student) => {
              dispatch(studentActions.UpdateStudent(student));
              toast('🦄 Edit successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            }}
          />
        </Box>
      )}
      {!Boolean(student) && (
        <Box>
          <StudentForm
            initialValue={initialValue}
            onSubmit={(student) => {
              dispatch(studentActions.addStudent(student));
              const newFilter = {
                _page: 1,
                _limit: 15,
              };
              // history.replace('/admin/students')
              dispatch(studentActions.setFilter(newFilter));
              toast('🦄 Add new student successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            }}
          />
        </Box>
      )}
    </Box>
  );
}
