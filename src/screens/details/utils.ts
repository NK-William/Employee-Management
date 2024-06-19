import {useEffect, useState} from 'react';
import {ISkill} from '../../interfaces/skill';
import Toast from 'react-native-toast-message';
import {IEmployee} from '../../interfaces/employee';
import {storage} from '../../utils';

export const useDetails = (navigation: any, editEmployee: any) => {
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [skills, setSkills] = useState<ISkill[]>([
    {name: '', yearsExperience: '', proficiency: ''},
  ]);
  const [editChanges, setEditChanges] = useState(false);

  // form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  if (editEmployee) {
    useEffect(() => {
      setFirstName(editEmployee.firstName);
      setLastName(editEmployee.lastName);
      setContactNumber(editEmployee.contactNumber);
      setEmailAddress(editEmployee.emailAddress);
      setDateOfBirth(new Date(editEmployee.dateOfBirth));
      setStreetAddress(editEmployee.streetAddress);
      setCity(editEmployee.city);
      setPostalCode(editEmployee.postalCode);
      setCountry(editEmployee.country);
      setSkills(editEmployee.skills);
    }, []);

    useEffect(() => {
      const skillsChanged = editEmployee.skills.some((skill: ISkill) => {
        const foundChangedSkill = skills.find((displayedSkill: ISkill) => {
          return (
            displayedSkill.name === skill.name &&
            displayedSkill.yearsExperience === skill.yearsExperience &&
            displayedSkill.proficiency === skill.proficiency
          );
        });

        return !foundChangedSkill;
      });

      if (
        firstName !== editEmployee.firstName ||
        lastName !== editEmployee.lastName ||
        contactNumber !== editEmployee.contactNumber ||
        emailAddress !== editEmployee.emailAddress ||
        !dateOfBirth ||
        formatDate(dateOfBirth) !==
          formatDate(new Date(editEmployee.dateOfBirth)) ||
        streetAddress !== editEmployee.streetAddress ||
        city !== editEmployee.city ||
        postalCode !== editEmployee.postalCode ||
        country !== editEmployee.country ||
        skillsChanged
      ) {
        setEditChanges(true);
      } else {
        setEditChanges(false);
      }
    }, [
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      dateOfBirth,
      streetAddress,
      city,
      postalCode,
      country,
      [JSON.stringify(skills)],
    ]);
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const generateId = () => {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let result = '';

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
      result += uppercaseLetters[randomIndex];
    }

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result += numbers[randomIndex];
    }
    return result;
  };

  const phoneNumberValid = (number: string): boolean => {
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    console.log('Phone number valid: ', phoneRegex.test(number));
    return phoneRegex.test(number);
  };

  const emailValid = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const formValid = () => {
    if (
      !skillsValid() ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !dateOfBirth ||
      !streetAddress ||
      !city ||
      !postalCode ||
      !country
    ) {
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!formValid()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return;
    }

    if (skills.length <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in at least one skill',
      });
      return;
    }

    if (!phoneNumberValid(contactNumber)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid phone number',
      });
      return;
    }

    if (!emailValid(emailAddress)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid email address',
      });
      return;
    }

    const employee: IEmployee = {
      id: generateId(),
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      dateOfBirth,
      streetAddress,
      city,
      postalCode,
      country,
      skills,
    };

    if (editEmployee) saveEditedEmployee(employee);
    else saveNewEmployee(employee);
  };

  const saveNewEmployee = (employee: IEmployee) => {
    storage
      .load({
        key: 'employees',
      })
      .then((employees: IEmployee[]) => {
        storage.save({
          key: 'employees',
          data: [...employees, employee],
        });
      })
      .catch(() => {
        storage.save({
          key: 'employees',
          data: [employee],
        });
      })
      .finally(() => {
        Toast.show({
          type: 'success',
          text1: 'Employee added',
          text2: `${firstName} ${lastName} has been added to the list of employees`,
        });

        navigation.goBack();
      });
  };

  const saveEditedEmployee = async (employee: IEmployee) => {
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
    Toast.show({
      type: 'success',
      text1: 'Employee changed',
      text2: `${firstName} ${lastName} has been changed successfully`,
    });
    navigation.goBack();
  };

  const skillsValid = () => {
    if (
      skills.length > 0 &&
      (skills[skills.length - 1].name === '' ||
        skills[skills.length - 1].yearsExperience === '' ||
        skills[skills.length - 1].proficiency === '')
    )
      return false;
    else return true;
  };

  const addSkill = () => {
    if (!skillsValid()) {
      Toast.show({
        type: 'error',
        text1: 'Error adding skill',
        text2: 'Please fill in the current skill before adding a new one',
      });
      return;
    }

    setSkills([...skills, {name: '', yearsExperience: '', proficiency: ''}]);
  };

  const updateSkill = (
    index: number,
    key: 'name' | 'yearsExperience' | 'proficiency',
    value: string,
  ) => {
    const newSkills = [...skills];
    newSkills[index][key] = value;
    setSkills(newSkills);
  };

  const deleteSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return {
    editChanges,
    firstName,
    lastName,
    contactNumber,
    emailAddress,
    dateOfBirth,
    dateModalOpen,
    streetAddress,
    city,
    postalCode,
    country,
    skills,
    updateSkill,
    deleteSkill,
    addSkill,
    onSubmit,
    setFirstName,
    setLastName,
    setContactNumber,
    setEmailAddress,
    setDateModalOpen,
    setDateOfBirth,
    formatDate,
    setStreetAddress,
    setCity,
    setPostalCode,
    setCountry,
  };
};
