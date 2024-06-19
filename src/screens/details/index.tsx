import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import getStyling from './style';
import {TextEntry, DateEntry} from '../../components';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ISkill} from '../../interfaces/skill';
import DropDownEntry from '../../components/dropDownEntry';
import {useDetails} from './utils';

const Details = ({navigation, route}: any) => {
  const editEmployee = route.params?.employee;

  const {
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
  } = useDetails(navigation, editEmployee);

  const styles = getStyling();

  const Skill = ({index, item}: {index: number; item: ISkill}) => {
    const {name, yearsExperience, proficiency} = item;

    const options = ['Beginner', 'Intermediate', 'Senior'].filter(
      p => p !== proficiency,
    );

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
        <DropDownEntry
          title="Seniority Rating"
          value={proficiency}
          hideTitle={index !== 0}
          options={options}
          onOptionSelect={option => updateSkill(index, 'proficiency', option)}
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
    const editDisabled = editEmployee && !editChanges;
    return (
      <TouchableOpacity
        disabled={editDisabled}
        onPress={onSubmit}
        style={{...styles.submitButton, opacity: editDisabled ? 0.15 : 1}}>
        <Ionicons
          name={editEmployee ? 'pencil' : 'add-circle-sharp'}
          size={editEmployee ? 22 : 30}
          color="white"
          style={styles.submitButtonIcon}
        />
        <Text style={styles.submitButtonText}>
          {editEmployee ? 'Save changes to Employee' : 'Save and Add Employee'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>
        {editEmployee ? 'Edit Employees' : 'New Employee'}
      </Text>
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
      <AddSkillButton />
      <SubmitButton />
    </ScrollView>
  );
};

export default Details;
