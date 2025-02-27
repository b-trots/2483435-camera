import { toast } from 'react-toastify';

const notify = (message: string) => toast.error(message);

export { notify };
