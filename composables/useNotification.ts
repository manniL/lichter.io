import type { AppNotification } from '~/types.js';

export function useNotifications() {
  const notifications = useState<AppNotification[]>('notifications', () => [])
  const removeNotification = (id: string) => {
    const notificationIndex = notifications.value.findIndex((n) => n.id === id)
    const notification = notifications.value[notificationIndex]
    notification.onRemove?.()
    notifications.value.splice(notificationIndex, 1)
  }
  const addNotification = (notification: Omit<AppNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9) + new Date().getTime().toString(36)
    notifications.value.push({ ...notification, id })
    if(notification.durationInMs){
      setTimeout(() => {
        removeNotification(id)
      }, notification.durationInMs)
    }
  }

  return {
    notifications: readonly(notifications),
    removeNotification,
    addNotification,
  }
}