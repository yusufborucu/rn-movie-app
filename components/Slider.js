import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Slider = ({ title, data, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
        <FlatList 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          data={data} 
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={styles.itemContainer}
              onPress={() => navigation.navigate('DetailScreen', {
                id: item.id
              })}
            >
              <View style={styles.itemTopInfos}>
                <Text style={styles.itemRate}>{ item.vote_average }</Text>
                <Text style={styles.itemYear}>{ item.release_date.substr(0, 4) }</Text>
              </View>              
              <Image 
                style={styles.itemImage} 
                source={{ uri: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` }} 
              />
              <Text style={styles.itemTitle}>{ item.title }</Text>
            </TouchableOpacity>            
          )}
          keyExtractor={item => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  title: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10
  },
  itemContainer: {
    marginRight: 10,
    width: 150
  },
  itemTopInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemRate: {
    backgroundColor: '#27ae60',
    color: '#ffffff',
    padding: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  itemYear: {
    backgroundColor: '#34495e',
    color: '#ffffff',
    padding: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  itemImage: {
    height: 225
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#000000'
  }
})

export default Slider