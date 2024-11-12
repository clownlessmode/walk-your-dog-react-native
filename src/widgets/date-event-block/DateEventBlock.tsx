export const formatDate = (datetime: string) => {
    const date = new Date(datetime);
  
    const dayMonth = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  
    const hoursMinutes = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    return { dayMonth, hoursMinutes };
  };