import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyling from './style';
import {accent, gray} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IEmployee} from '../../interfaces/employee';
import {storage} from '../../utils';

const List = ({navigation}: any) => {
  const styles = getStyling();
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    storage.load({key: 'employees'}).then((employees: IEmployee[]) => {
      setEmployees(employees);
    });
  }, []);

  const deleteEmployee = (id: string) => {
    const newEmployees = employees.filter(employee => employee.id !== id);
    storage.save({key: 'employees', data: newEmployees});
    setEmployees(newEmployees);
  };

  const Search = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.entry}
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
            data={employees}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ListItem item={item} />}
          />
        ) : (
          <EmptyList />
        )}
        {showFilterPopUp && (
          <View style={styles.filterPopUp}>
            <Text style={styles.filterOptionText}>Text here</Text>
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
