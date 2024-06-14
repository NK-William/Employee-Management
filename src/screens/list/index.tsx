import {View, Text, TextInput} from 'react-native';
import React from 'react';
import getStyling from './style';
import {gray} from '../../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
          <SimpleLineIcons
            name="arrow-down"
            size={20}
            style={{color: 'white', marginLeft: 8}}
          />
        </View>
      </View>
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
    </View>
  );
};

export default List;
