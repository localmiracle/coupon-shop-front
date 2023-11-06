import { configureStore } from '@reduxjs/toolkit';

import phoneReducer, { PhoneState } from './phoneSlice';
import tokenReducer, { TokenState } from './tokenSlice';
import modalReducer, { ModalState } from './modalReducer';
import messagesReducer, { MessagesState } from './messagesSlice';
import updateInfo, { UpdateState } from './updateInfo';
import activePageSlice, { ActivePageState } from './activePageSlice';
import valueSlice, { ValuesState } from './valueSlice';
import activeSlice, { ActiveState } from './activeSlice';
import regionSlice, { RegionState } from './regionSlice';

export interface RootState {
  region: RegionState;
  phone: PhoneState;
  token: TokenState;
  modal: ModalState;
  messages: MessagesState;
  updateInfo: UpdateState;
  activePage: ActivePageState;
  values: ValuesState;
  active: ActiveState;
}

const store = configureStore({
  reducer: {
    phone: phoneReducer,
    token: tokenReducer,
    modal: modalReducer,
    messages: messagesReducer,
    updateInfo: updateInfo,
    activePage: activePageSlice,
    values: valueSlice, 
    active: activeSlice,
    region: regionSlice,

    // Другие редюсеры могут быть добавлены здесь
  },
});

export default store;