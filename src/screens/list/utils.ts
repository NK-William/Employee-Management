import {useCallback, useState} from 'react';
import {IEmployee} from '../../interfaces/employee';
import {useFocusEffect} from '@react-navigation/native';
import {storage} from '../../utils';

const allFilterOptions = [
  'All employees',
  'Age 18 - 25',
  'Age 26 - 30',
  'Age more than 30',
  'Single skill',
  'More skills',
];

const initFilterOptions = [
  'Age 18 - 25',
  'Age 26 - 30',
  'Age more than 30',
  'Single skill',
  'More skills',
];

export const useList = () => {
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [displayedEmployees, setDisplayedEmployees] = useState<IEmployee[]>([]);
  const [filterOptions, setFilterOptions] = useState(initFilterOptions);
  const [filterOption, setFilterOption] = useState(allFilterOptions[0]);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      showFilterPopUp && setShowFilterPopUp(false);
      storage.load({key: 'employees'}).then((employees: IEmployee[]) => {
        setEmployees(employees);
        setDisplayedEmployees(employees);
      });
      setFilterOption(allFilterOptions[0]);
    }, []),
  );

  const deleteEmployee = (id: string) => {
    const newEmployees = employees.filter(employee => employee.id !== id);
    storage.save({key: 'employees', data: newEmployees});
    setEmployees(newEmployees);
    setDisplayedEmployees(newEmployees);
  };

  const applyFilter = (option: string) => {
    setDisplayedEmployees(filterEmployees(option));
    setFilterOption(option);
    const newOptions = allFilterOptions.filter(op => op !== option);
    setFilterOptions(newOptions);
    setShowFilterPopUp(false);
  };

  const filterEmployees = (filterOption: string): IEmployee[] => {
    const currentYear = new Date().getFullYear();

    switch (filterOption) {
      case 'All employees':
        return employees;

      case 'Age 18 - 25':
        return employees.filter(employee => {
          if (employee.dateOfBirth) {
            const age =
              currentYear - new Date(employee.dateOfBirth).getFullYear();
            return age >= 18 && age <= 25;
          }
          return false;
        });

      case 'Age 26 - 30':
        return employees.filter(employee => {
          if (employee.dateOfBirth) {
            const age =
              currentYear - new Date(employee.dateOfBirth).getFullYear();
            return age >= 26 && age <= 30;
          }
          return false;
        });

      case 'Age more than 30':
        return employees.filter(employee => {
          if (employee.dateOfBirth) {
            const age =
              currentYear - new Date(employee.dateOfBirth).getFullYear();
            return age > 30;
          }
          return false;
        });

      case 'Single skill':
        return employees.filter(employee => employee.skills.length === 1);

      case 'More skills':
        return employees.filter(employee => employee.skills.length > 1);

      default:
        return employees;
    }
  };

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    setDisplayedEmployees(searchEmployees(text));
  };

  const searchEmployees = (searchText: string): IEmployee[] => {
    const lowerSearchText = searchText.toLowerCase();

    return employees.filter(employee => {
      const matchesFirstName = employee.firstName
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesLastName = employee.lastName
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesContactNumber = employee.contactNumber
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesEmailAddress = employee.emailAddress
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesStreetAddress = employee.streetAddress
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesCity = employee.city.toLowerCase().includes(lowerSearchText);
      const matchesPostalCode = employee.postalCode
        .toLowerCase()
        .includes(lowerSearchText);
      const matchesCountry = employee.country
        .toLowerCase()
        .includes(lowerSearchText);

      const matchesDateOfBirth = employee.dateOfBirth
        ? new Date(employee.dateOfBirth)
            .toISOString()
            .toLowerCase()
            .includes(lowerSearchText)
        : false;

      const matchesSkills = employee.skills.some(
        skill =>
          skill.name.toLowerCase().includes(lowerSearchText) ||
          skill.yearsExperience.toString().includes(lowerSearchText) ||
          skill.proficiency.toLowerCase().includes(lowerSearchText),
      );

      return (
        matchesFirstName ||
        matchesLastName ||
        matchesContactNumber ||
        matchesEmailAddress ||
        matchesStreetAddress ||
        matchesCity ||
        matchesPostalCode ||
        matchesCountry ||
        matchesDateOfBirth ||
        matchesSkills
      );
    });
  };

  return {
    searchText,
    showFilterPopUp,
    filterOption,
    employees,
    displayedEmployees,
    filterOptions,
    setShowFilterPopUp,
    onSearchTextChange,
    applyFilter,
    deleteEmployee,
  };
};
