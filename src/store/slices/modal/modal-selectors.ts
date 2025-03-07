import { SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';

const getActiveModal = (state: State) => state[SliceName.Modal].modalWindow;
const getModalStatus = (state: State) => state[SliceName.Modal].modalStatus;

export { getActiveModal, getModalStatus };
