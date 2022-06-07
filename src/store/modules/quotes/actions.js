import { LOAD_QUOTES, ADD_NEW_QUOTE, REMOVE_QUOTE, UPDATE_QUOTE } from "./types"
import { db } from "@/firebaseInit";
import store from "@/store";
import {
    collection,
    addDoc,
    getDocs,

} from "firebase/firestore";

const collection_name = 'quotes';

const categoriesRef = collection(db, collection_name);


export default {
    async [LOAD_QUOTES]() {
        try {
            store.dispatch('loading/SET_LOADING', true);
            const snapshot = await getDocs(categoriesRef);
            let categories = [];
            snapshot.forEach(doc => {
                categories.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            return categories;
        } catch (err) {
            console.log(err);
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },
    async [ADD_NEW_QUOTE](context, payload) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            const { id } = await addDoc(categoriesRef, {
                ...payload,
                created_at: Date.now(),
            });
            if (id) {
                store.dispatch('alert/SET_ALERT', {
                    text: 'Запись добавлена успешно',
                    color: 'var(--green)'
                })
                return { success: true, id }
            }
            return { success: false }
        } catch (err) {
            console.log(err);
            store.dispatch('alert/SET_ALERT', {
                text: 'Произошла ошибка, повторите позже',
                color: 'var(--red)'
            })
            return { success: false }
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },
    async [REMOVE_QUOTE](context, id) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            await db.collection(collection_name).doc(id).delete();

            store.dispatch('alert/SET_ALERT', {
                text: 'Запись удалена успешно',
                color: 'var(--green)'
            })
            return { success: true }

        } catch (err) {
            console.log(err);
            store.dispatch('alert/SET_ALERT', {
                text: 'Произошла ошибка, повторите позже',
                color: 'var(--red)'
            })
            return { success: false }
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },
    async [UPDATE_QUOTE](context, { id, ...payload }) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            await db.collection(collection_name).doc(id).update({
                updated_at: Date.now(),
                ...payload,
            });

            store.dispatch('alert/SET_ALERT', {
                text: 'Запись обновлена успешно',
                color: 'var(--green)'
            })

            return { success: true }

        } catch (err) {
            console.log(err);
            store.dispatch('alert/SET_ALERT', {
                text: 'Произошла ошибка, повторите позже',
                color: 'var(--red)'
            })
            return { success: false }
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },

}