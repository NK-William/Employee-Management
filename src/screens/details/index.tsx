import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {Key, useState} from 'react';
import getStyling from './style';
import {TextEntry, DateEntry} from '../../components';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {ISkill} from '../../interfaces/skill';
import {IEmployee} from '../../interfaces/employee';
import {storage} from '../../utils';

const Details = () => {
  const styles = getStyling();

  const [dateModalOpen, setDateModalOpen] = useState(false);

  const [skills, setSkills] = useState<ISkill[]>([
    {name: '', yearsExperience: '', proficiency: ''},
  ]);

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

    // Generate 2 random uppercase letters
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
      result += uppercaseLetters[randomIndex];
    }

    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result += numbers[randomIndex];
    }

    return result;
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

    console.log(employee);

    storage
      .load({
        key: 'employees',
      })
      .then((employees: IEmployee[]) => {
        console.log('got prev employees');
        storage.save({
          key: 'employees',
          data: [...employees, employee],
        });
      })
      .catch(() => {
        console.log('new employee');
        storage.save({
          key: 'employees',
          data: [employee],
        });
      });

    Toast.show({
      type: 'success',
      text1: 'Employee added',
      text2: `${firstName} ${lastName} has been added to the list of employees`,
    });
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
    console.log(skills);
    setSkills(newSkills);
  };

  const deleteSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const Skill = ({index, item}: {index: number; item: ISkill}) => {
    const {name, yearsExperience, proficiency} = item;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextEntry
          title="Skill"
          hideTitle={index !== 0}
          value={name}
          onChangeText={text => updateSkill(index, 'name', text)}
          containerStyle={{...styles.entry, flex: 1.6}}
        />
        <TextEntry
          title="Yrs Exp"
          keyboardType="number-pad"
          value={yearsExperience}
          hideTitle={index !== 0}
          onChangeText={text => updateSkill(index, 'yearsExperience', text)}
          containerStyle={{...styles.entry, marginHorizontal: 10, flex: 1}}
        />
        <TextEntry
          title="Seniority Rating"
          value={proficiency}
          hideTitle={index !== 0}
          onChangeText={text => updateSkill(index, 'proficiency', text)}
          containerStyle={{...styles.entry, flex: 2.2}}
        />
        <TouchableOpacity onPress={() => deleteSkill(index)}>
          <FontAwesome
            name="trash"
            size={20}
            color="white"
            style={{...styles.skillTrashIcon, marginTop: index !== 0 ? 10 : 32}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const AddSkillButton = () => {
    return (
      <TouchableOpacity style={styles.addSkillButton}>
        <Text style={styles.addSkillButtonText} onPress={addSkill}>
          + Add New Skill
        </Text>
      </TouchableOpacity>
    );
  };

  const SubmitButton = () => {
    return (
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.submitButton}>
          <Ionicons
            name="add-circle-sharp"
            size={30}
            color="white"
            style={styles.submitButtonIcon}
          />
          <Text style={styles.submitButtonText}>Save and Add Employee</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>New Employee</Text>
      <Text style={styles.subTitleText}>Basic Info</Text>
      <View style={{flexDirection: 'row'}}>
        <TextEntry
          title="First Name"
          value={firstName}
          onChangeText={setFirstName}
          containerStyle={{...styles.entry, marginRight: 5, flex: 1}}
        />
        <TextEntry
          title="Last Name"
          value={lastName}
          onChangeText={setLastName}
          containerStyle={{...styles.entry, marginLeft: 5, flex: 1}}
        />
      </View>
      <TextEntry
        title="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
        containerStyle={styles.entry}
      />
      <TextEntry
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        title="Email Address"
        containerStyle={styles.entry}
      />
      <DateEntry
        title="Date of Birth"
        containerStyle={{...styles.entry, width: '50%'}}
        onPress={() => setDateModalOpen(true)}
        date={dateOfBirth ? formatDate(dateOfBirth) : undefined}
      />
      <DatePicker
        modal
        open={dateModalOpen}
        date={dateOfBirth ?? new Date()}
        onConfirm={date => {
          setDateModalOpen(false);
          setDateOfBirth(date);
        }}
        onCancel={() => {
          setDateModalOpen(false);
        }}
        mode="date"
      />
      <Text style={styles.subTitleText}>Address Info</Text>
      <TextEntry
        title="Street Address"
        value={streetAddress}
        onChangeText={setStreetAddress}
        containerStyle={styles.entry}
      />
      <View style={{flexDirection: 'row'}}>
        <TextEntry
          title="City"
          value={city}
          onChangeText={setCity}
          containerStyle={{...styles.entry, flex: 1}}
        />
        <TextEntry
          title="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="number-pad"
          containerStyle={{...styles.entry, marginHorizontal: 10, flex: 1}}
        />
        <TextEntry
          title="Country"
          value={country}
          onChangeText={setCountry}
          containerStyle={{...styles.entry, flex: 1}}
        />
      </View>
      <Text style={styles.subTitleText}>Skills</Text>
      {skills.map((skill, index) => (
        <Skill key={index} index={index} item={skill} />
      ))}
      {/* <FlatList
        data={skills}
        keyExtractor={index => index.toString()}
        renderItem={({index, item}) => <Skill index={index} item={item} />}
      /> */}
      <AddSkillButton />
      <SubmitButton />
    </ScrollView>
  );
};

export default Details;
