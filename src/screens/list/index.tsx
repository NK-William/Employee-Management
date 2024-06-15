import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import getStyling from './style';
import {accent, gray} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
}
const fakeData: IEmployee[] = [
  {
    id: 1,
    firstName: 'Aaaaa',
    lastName: '111111',
    contactNumber: '0711111111',
  },
  {
    id: 2,
    firstName: 'Bbbbb',
    lastName: '222222222',
    contactNumber: '0722222222',
  },
  {
    id: 3,
    firstName: 'Ccccc',
    lastName: '333333',
    contactNumber: '0733333333',
  },
  {
    id: 4,
    firstName: 'Eeeeee',
    lastName: '444444',
    contactNumber: '0744444444',
  },
  {
    id: 5,
    firstName: 'Ffffff',
    lastName: '555555',
    contactNumber: '0755555555',
  },
  {
    id: 6,
    firstName: 'Ggggggg',
    lastName: '666666',
    contactNumber: '0766666666',
  },
  {
    id: 7,
    firstName: 'Hhhhhh',
    lastName: '777777',
    contactNumber: '0777777777',
  },
  {
    id: 8,
    firstName: 'Iiiiiii',
    lastName: '8888888',
    contactNumber: '0788888888',
  },
  {
    id: 9,
    firstName: 'Jjjjjj',
    lastName: '999999',
    contactNumber: '0799999999',
  },
  {
    id: 10,
    firstName: 'Kkkkkk',
    lastName: '10101010',
    contactNumber: '071010101010',
  },
  {
    id: 11,
    firstName: 'Lllllll',
    lastName: '11111111',
    contactNumber: '0721111111',
  },
  {
    id: 12,
    firstName: 'Mmmmmm',
    lastName: '12121212',
    contactNumber: '0712121212',
  },
  {
    id: 13,
    firstName: 'Nnnnn',
    lastName: '13131313',
    contactNumber: '0713131313',
  },
];

const List = () => {
  const styles = getStyling();

  const Search = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchText}
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
          <AntDesign
            name="down"
            size={21}
            style={{color: accent, marginLeft: 8}}
          />
          {/* <Ionicons
            name="close-outline"
            size={23}
            style={{color: accent, marginLeft: 8}}
          /> */}
        </View>
      </View>
    );
  };

  const ListItem = ({item}: {item: IEmployee}) => {
    const {firstName, lastName, contactNumber} = item;

    return (
      <TouchableOpacity style={styles.listItemContainer}>
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
          <Text style={styles.listItemDetailsNumberText}>0711111111</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.largeText}>Employees</Text>
        <Text style={styles.smallText}>There are 4 employees</Text>
        <View style={styles.filterSearchContainer}>
          <Search />
          <Filter />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={fakeData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>
    </View>
  );
};

export default List;
