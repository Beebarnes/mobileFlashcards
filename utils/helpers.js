import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIFICATION_KEY = 'mobileFlashcards:notifications'

export function generateId () {
  const string = Date.now().toString()
  return string
}

export const clearLocalNotification = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
  } catch (error) {
    console.log(error)
  }
}

export const setLocalNotification = async () => {
  try {
    const results = await AsyncStorage.getItem(NOTIFICATION_KEY)
    const data = JSON.parse(results)
    console.log('setLocalData', data)
    if (data === null) {
      console.log('Ask Permissions')
      const {status} = await Notifications.getPermissionsAsync();
      console.log(status)
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Notifications Sent',
            body: "Quiz yourself and keep"
          },
          trigger: {
            hour: 20,
            minute: 0,
            repeats: true
          }
        }).then((string ) => console.log('scheduleNotificationsAsync', string))
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
      }
    }
  } catch (error) {
    console.log(error)
  }
}
