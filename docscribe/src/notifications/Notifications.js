import { Notifications, Permissions } from 'expo';

const registerForPushNotifications = async (app, user) => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;

  if (status !== 'granted') {
    finalStatus = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (finalStatus !== 'granted') {
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync();

  app.app
    .database()
    .ref(`users/${user}`)
    .update({
      expoPushToken: token,
    });
};

export default registerForPushNotifications;
