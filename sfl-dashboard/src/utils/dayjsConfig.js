import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Extend dayjs with the localizedFormat plugin
dayjs.extend(localizedFormat);
export default dayjs;