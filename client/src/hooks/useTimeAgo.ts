type TimeAgoFn = (date: string) => string;

const useTimeAgo = (): TimeAgoFn => {
  const calculateTimeAgo = (date: string): string => {
    const now = new Date();
    const sentDate = new Date(date);
    const timeDifference = now.getTime() - sentDate.getTime();

    const minutes = Math.floor(timeDifference / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    } else if (months > 0) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
  };

  return calculateTimeAgo;
};

export default useTimeAgo;
