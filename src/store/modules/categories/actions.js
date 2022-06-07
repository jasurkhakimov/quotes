import { LOAD_CATEGORIES, ADD_NEW_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from "./types"
import { db } from "@/firebaseInit";
import store from "@/store";
import {
    collection,
    addDoc,
    getDocs,

} from "firebase/firestore";

const collection_name = 'categories';

const categoriesRef = collection(db, collection_name);


export default {
    async [LOAD_CATEGORIES]() {
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
    async [ADD_NEW_CATEGORY](context, title) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            const { id } = await addDoc(categoriesRef, {
                title,
                created_at: Date.now(),
                updated_at: null,
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
    async [REMOVE_CATEGORY](context, id) {
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
    async [UPDATE_CATEGORY](context, { id, title }) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            await db.collection(collection_name).doc(id).update({
                title,
                updated_at: Date.now(),
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