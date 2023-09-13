import { createReducer, on } from '@ngrx/store';
import { addAddress, deleteAddress, editAddress, getAddresses } from './addresses.actions';
import { Address } from '../../models/Address';

export const initialState: Address[] = [];

export const addressesReducer = createReducer(
  initialState,
  on(getAddresses, (state, { addresses }) => addresses),
  on(addAddress, (state, { data }) => [...state, data]),
  on(editAddress, (state, { data }) =>
    state.map((existingAddress) =>
    existingAddress.id === data.id ? data : existingAddress
    )
  ),
  on(deleteAddress, (state, { id }) => state.filter((address) => address.id !== id)),
);
