import {IEmployee} from '../interfaces/employee';

let mockEmployees: IEmployee[] = [
  {
    id: 'AB1234',
    firstName: 'Tebogo',
    lastName: 'Nkuna',
    contactNumber: '0711111111',
    emailAddress: 'Tebogo@gmail.com',
    dateOfBirth: new Date('1990-01-01'),
    streetAddress: '123 Main Street',
    city: 'Johannesburg',
    postalCode: '2000',
    country: 'South Africa',
    skills: [
      {
        name: 'React',
        yearsExperience: '3',
        proficiency: 'Intermediate',
      },
      {
        name: 'React Native',
        yearsExperience: '4',
        proficiency: 'Senior',
      },
    ],
  },
  {
    id: 'CD4264',
    firstName: 'William',
    lastName: 'Nkuna',
    contactNumber: '0722222222',
    emailAddress: 'William@gmail.com',
    dateOfBirth: new Date('1992-04-11'),
    streetAddress: '34 Glove Avenue',
    city: 'Johannesburg',
    postalCode: '2000',
    country: 'South Africa',
    skills: [
      {
        name: 'Xamarin',
        yearsExperience: '1',
        proficiency: 'Junior',
      },
      {
        name: 'React Native',
        yearsExperience: '2',
        proficiency: 'Intermediate',
      },
    ],
  },
];

const saveEmployee = (employee: IEmployee): Promise<IEmployee> => {
  return new Promise(resolve => {
    setTimeout(() => {
      mockEmployees.push(employee);
      resolve(employee);
    }, 1000);
  });
};

const updateEmployee = async (editEmployee: IEmployee): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      mockEmployees = mockEmployees.map(employee => {
        if (employee.id === editEmployee.id) {
          return editEmployee;
        } else {
          return employee;
        }
      });
      resolve(true);
    }, 1000);
  });
};

const getEmployees = async (): Promise<IEmployee[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockEmployees);
    }, 1000);
  });
};

const deleteEmployee = (id: string): Promise<IEmployee[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      mockEmployees = mockEmployees.filter(employee => employee.id !== id);
      resolve(mockEmployees);
    }, 1000);
  });
};

export default {
  saveEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee,
};
