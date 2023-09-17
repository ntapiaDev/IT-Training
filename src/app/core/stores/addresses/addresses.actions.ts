import { createAction, props } from '@ngrx/store';
import { Address } from '../../models/Address';

export const getAddresses = createAction('[adresses] Charger adresses', props<{ addresses: Address[] }>());
export const addAddress = createAction('[adresses] Ajouter adresses', props<{ data: Address }>());
export const editAddress = createAction('[adresses] Editer adresses', props<{ data: Address }>());
export const deleteAddress = createAction('[adresses] Supprimer adresses', props<{ id: number }>());
