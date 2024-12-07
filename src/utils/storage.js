const STORAGE_KEY = 'study_buddy_data';

export const saveToStorage = (data) => {
  try {
    const existingData = loadFromStorage() || {};
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return null;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

export const updateUserProgress = (data) => {
  const stored = loadFromStorage() || {};
  const updatedProgress = {
    ...stored,
    progress: {
      ...(stored.progress || {}),
      ...data
    }
  };
  return saveToStorage(updatedProgress);
};