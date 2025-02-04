import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../common/CustomHeader';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchScreen = () => {
  const [filterData, setFilterData] = useState({
    workType: [],
    city: [],
    industry: [],
    duration: []
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    workType: [],
    city: [],
    industry: [],
    duration: []
  });
  
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Arama çubuğu durumu
  const db = getFirestore(app);

  const filterTitles = {
    workType: 'Staj Türü',
    city: 'Şehir',
    industry: 'Sektör',
    duration: 'Staj Süresi'
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      const docRef = doc(db, 'internshipTypes', 'A6NzzDmxKrc3bgzVHzlo');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFilterData({
          workType: Array.isArray(data.WorkType) ? data.WorkType : [data.WorkType],
          city: Array.isArray(data.City) ? [...data.City].sort() : [data.City],
          industry: Array.isArray(data.Industry) ? data.Industry : [data.Industry],
          duration: Array.isArray(data.duration) ? data.duration : [data.duration]
        });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };

  const isItemSelected = (filterType, item) => {
    return selectedFilters[filterType].includes(item);
  };

  const toggleFilterSelection = (filterType, item) => {
    setSelectedFilters(prev => {
      const currentSelection = prev[filterType];
      const newSelection = currentSelection.includes(item)
        ? currentSelection.filter(i => i !== item)
        : [...currentSelection, item];
      return {
        ...prev,
        [filterType]: newSelection
      };
    });
  };

  const FilterButton = ({ filterKey, onPress, isActive }) => (
    <TouchableOpacity 
      style={[styles.filterButton, isActive && styles.filterButtonActive]} 
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
        {selectedFilters[filterKey].length > 0 
          ? `${filterTitles[filterKey]} (${selectedFilters[filterKey].length})`
          : filterTitles[filterKey]}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {activeFilter ? filterTitles[activeFilter] : ''}
          </Text>
          <ScrollView style={styles.modalScroll}>
            {filterData[activeFilter]?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.filterItem}
                onPress={() => toggleFilterSelection(activeFilter, item)}
              >
                <View style={styles.filterItemContent}>
                  <Text style={[
                    styles.filterItemText,
                    isItemSelected(activeFilter, item) && styles.filterItemTextSelected
                  ]}>
                    {item}
                  </Text>
                  {isItemSelected(activeFilter, item) && (
                    <View style={styles.checkIconContainer}>
                      <Ionicons name="checkmark" size={24} color="#007AFF" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setSelectedFilters(prev => ({
                  ...prev,
                  [activeFilter]: []
                }));
              }}
            >
              <Text style={styles.clearButtonText}>Temizle</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Uygula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Örnek ilanlar için dummy veriler
  const exampleInternships = [
    { id: 1, title: 'Stajyer Yazılımcı', company: 'ABC Teknoloji', city: 'Muğla', industry: 'Teknoloji', duration: '3 Ay' },
    { id: 2, title: 'Pazarlama Stajyeri', company: 'XYZ Ltd.', city: 'İstanbul', industry: 'Pazarlama', duration: '6 Ay' },
    { id: 3, title: 'Mühendislik Stajyeri', company: 'Techies Inc.', city: 'Ankara', industry: 'Mühendislik', duration: '4 Ay' },
  ];

  // Arama çubuğu ile filtreleme
  const filteredInternships = exampleInternships.filter(internship =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Arama"
        logoSource={require('../../../assets/images/logo.png')}
        showBackButton={false}
      />
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            filterKey="workType"
            onPress={() => {
              setActiveFilter('workType');
              setShowFilterModal(true);
            }}
            isActive={selectedFilters.workType.length > 0}
          />
          <FilterButton
            filterKey="city"
            onPress={() => {
              setActiveFilter('city');
              setShowFilterModal(true);
            }}
            isActive={selectedFilters.city.length > 0}
          />
          <FilterButton
            filterKey="industry"
            onPress={() => {
              setActiveFilter('industry');
              setShowFilterModal(true);
            }}
            isActive={selectedFilters.industry.length > 0}
          />
          <FilterButton
            filterKey="duration"
            onPress={() => {
              setActiveFilter('duration');
              setShowFilterModal(true);
            }}
            isActive={selectedFilters.duration.length > 0}
          />
        </ScrollView>
        
        {/* Arama Çubuğu */}
        <TextInput
          style={styles.searchInput}
          placeholder="Arama yap..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Örnek İlanlar */}
      <ScrollView style={styles.announcementContainer}>
        {filteredInternships.map(internship => (
          <View key={internship.id} style={styles.announcementItem}>
            <Text style={styles.announcementTitle}>{internship.title}</Text>
            <Text style={styles.announcementDetails}>
              {internship.company} - {internship.city} - {internship.duration}
            </Text>
          </View>
        ))}
      </ScrollView>

      {renderFilterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: 10,
  },
  announcementContainer: {
    padding: 10,
  },
  announcementItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#EBF5FF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalScroll: {
    maxHeight: '70%',
  },
  filterItem: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  filterItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterItemText: {
    fontSize: 16,
    color: '#333',
  },
  filterItemTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchScreen;
