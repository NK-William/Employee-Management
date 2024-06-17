import {View, Text, ScrollView, TouchableOpacity, Button} from 'react-native';
import React, {Key, useState} from 'react';
import getStyling from './style';
import {TextEntry, DateEntry} from '../../components';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ISkill {
  name: string;
  yearsExperience: string;
  proficiency: string;
}

const Details = () => {
  const styles = getStyling();

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [skills, setSkills] = useState<ISkill[]>([
    {name: '', yearsExperience: '', proficiency: ''},
  ]);

  console.log(skills);
  console.log('Length: ' + skills.length);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const addSkill = () => {
    if (
      skills.length > 0 &&
      (skills[skills.length - 1].name === '' ||
        skills[skills.length - 1].yearsExperience === '' ||
        skills[skills.length - 1].proficiency === '')
    ) {
      console.log('Please fill in the current skill before adding a new one');
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>New Employee</Text>
      <Text style={styles.subTitleText}>Basic Info</Text>
      <View style={{flexDirection: 'row'}}>
        <TextEntry
          title="First Name"
          containerStyle={{...styles.entry, marginRight: 5, flex: 1}}
        />
        <TextEntry
          title="Last Name"
          containerStyle={{...styles.entry, marginLeft: 5, flex: 1}}
        />
      </View>
      <TextEntry
        title="Contact Number"
        keyboardType="phone-pad"
        containerStyle={styles.entry}
      />
      <TextEntry
        keyboardType="email-address"
        title="Email Address"
        containerStyle={styles.entry}
      />
      <DateEntry
        title="Date of Birth"
        containerStyle={{...styles.entry, width: '50%'}}
        onPress={() => setDateModalOpen(true)}
        date={date ? formatDate(date) : undefined}
      />
      <DatePicker
        modal
        open={dateModalOpen}
        date={date ?? new Date()}
        onConfirm={date => {
          setDateModalOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setDateModalOpen(false);
        }}
        mode="date"
      />
      <Text style={styles.subTitleText}>Address Info</Text>
      <TextEntry title="Street Address" containerStyle={styles.entry} />
      <View style={{flexDirection: 'row'}}>
        <TextEntry title="City" containerStyle={{...styles.entry, flex: 1}} />
        <TextEntry
          title="Last Name"
          keyboardType="number-pad"
          containerStyle={{...styles.entry, marginHorizontal: 10, flex: 1}}
        />
        <TextEntry
          title="Country"
          containerStyle={{...styles.entry, flex: 1}}
        />
      </View>
      <Text style={styles.subTitleText}>Skills</Text>
      {skills.map((skill, index) => (
        <Skill key={index} index={index} item={skill} />
      ))}
      <AddSkillButton />
      <Button title="test" />
    </ScrollView>
  );
};

export default Details;
