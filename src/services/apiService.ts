import {IEmployee} from '../interfaces/employee';
import {storage} from '../utils';

const saveEmployee = (employee: IEmployee): Promise<IEmployee> => {
  return new Promise(resolve => {
    storage
      .load({
        key: 'employees',
      })
      .then((employees: IEmployee[]) => {
        storage.save({
          key: 'employees',
          data: [...employees, employee],
        });
        resolve(employee);
      })
      .catch(() => {
        storage.save({
          key: 'employees',
          data: [employee],
        });
        resolve(employee);
      });
  });
};

const updateEmployee = async (
  employee: IEmployee,
  editEmployee: IEmployee,
): Promise<boolean> => {
  return new Promise(async resolve => {
    const employees = await storage.load({
      key: 'employees',
    });

    const updatedEmployees = employees.map((e: IEmployee) => {
      if (e.id === editEmployee.id) {
        return employee;
      } else {
        return e;
      }
    });

    await storage.save({key: 'employees', data: updatedEmployees});
    resolve(true);
  });
};

const getEmployees = (): Promise<IEmployee[]> => {
  return new Promise(resolve => {
    storage.load({key: 'employees'}).then((employees: IEmployee[]) => {
      resolve(employees);
    });
  });
};

const deleteEmployee = (id: string): Promise<IEmployee[]> => {
  return new Promise(async resolve => {
    const employees = await storage.load({key: 'employees'});
    const newEmployees = employees.filter(
      (employee: IEmployee) => employee.id !== id,
    );
    await storage.save({key: 'employees', data: newEmployees});
    resolve(newEmployees);
  });
};

export default {
  saveEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee,
};
