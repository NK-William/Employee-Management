import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import getStyling from './style';
import {accent, gray} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IEmployee} from '../../interfaces/employee';
import {storage} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';

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

const List = ({navigation}: any) => {
  const styles = getStyling();
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

  const Search = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.entry}
          value={searchText}
          onChangeText={onSearchTextChange}
          placeholder="Search"
          placeholderTextColor={gray}
        />
      </View>
    );
  };

  const Filter = () => {
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterIconTextContainer}>
          <Text style={styles.filterText}>Filter by</Text>
          {showFilterPopUp ? (
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() => setShowFilterPopUp(false)}>
              <Ionicons
                name="close-outline"
                size={23}
                style={{color: accent}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() => setShowFilterPopUp(true)}>
              <AntDesign name="down" size={21} style={{color: accent}} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.selectedFilterText}>{filterOption}</Text>
      </View>
    );
  };

  const EmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Image
          source={require('../../assets/images/emptyList.png')}
          style={styles.image}
        />
        <Text style={styles.emptyText1}>There is nothing here</Text>
        <Text style={styles.emptyText2}>
          Create a new employee by clicking the
          <Text style={styles.emptyTextPlus}> + </Text>button to get started
        </Text>
      </View>
    );
  };

  const ListItem = ({item}: {item: IEmployee}) => {
    const {id, firstName, lastName, contactNumber} = item;

    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => {
          navigation.navigate('Details', {employee: item});
        }}>
        <View style={styles.listItemNumberContainer}>
          <View style={styles.listItemNumberCircle}>
            <Text style={styles.listItemNumber}>1</Text>
          </View>
        </View>
        <View style={styles.listItemDetailsContainer}>
          <Text
            numberOfLines={1}
            style={
              styles.listItemDetailsNameText
            }>{`${firstName}  ${lastName}`}</Text>
          <Text style={styles.listItemDetailsNumberText}>{contactNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteEmployee(id)}>
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.largeText}>Employees</Text>
        <Text style={styles.smallText}>
          {employees.length
            ? employees.length === 1
              ? 'There is 1 employee'
              : `There are ${employees.length} employees`
            : 'No employees'}
        </Text>
        <View style={styles.filterSearchContainer}>
          <Search />
          <Filter />
        </View>
      </View>
      <View style={styles.listContainer}>
        {employees.length ? (
          <FlatList
            data={displayedEmployees}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ListItem item={item} />}
          />
        ) : (
          <EmptyList />
        )}
        {showFilterPopUp && (
          <View style={styles.filterPopUp}>
            {filterOptions.map((filterOption, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => applyFilter(filterOption)}>
                <Text style={styles.filterOptionText}>{filterOption}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.addButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default List;
