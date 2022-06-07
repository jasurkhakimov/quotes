import { LOAD_QUOTES, ADD_NEW_QUOTE, REMOVE_QUOTE, UPDATE_QUOTE, LOAD_FILTERED_QUOTES, RANDOM_QUOTE } from "./types"
import { db } from "@/firebaseInit";
import store from "@/store";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";

const collection_name = 'quotes';

const quotesRef = collection(db, collection_name);


export default {
    async [LOAD_QUOTES]({ commit }) {
        try {
            const q = query(quotesRef, orderBy('created_at', 'desc'))
            store.dispatch('loading/SET_LOADING', true);
            const snapshot = await getDocs(q);
            let quotes = [];
            snapshot.forEach(doc => {
                quotes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            commit('set_quotes', quotes);
            return quotes;
        } catch (err) {
            console.log(err);
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },
    async [LOAD_FILTERED_QUOTES](context, arr) {
        try {
            const q = query(quotesRef, where('category', "array-contains-any", arr), orderBy('created_at', 'desc'))
            store.dispatch('loading/SET_LOADING', true);
            const snapshot = await getDocs(q);
            let quotes = [];
            snapshot.forEach(doc => {
                quotes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            return quotes;
        } catch (err) {
            console.log(err);
        } finally {
            store.dispatch('loading/SET_LOADING', false);
        }
    },
    async [ADD_NEW_QUOTE](context, payload) {
        try {
            store.dispatch('loading/SET_LOADING', true);
            const { id } = await addDoc(quotesRef, {
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
    [RANDOM_QUOTE]({ commit, state }) {
        let filtered_quotes = state.quotes.filter(item => !state.shown_quotes.includes(item.id));
        if (filtered_quotes.length == 1) {
            console.log(filtered_quotes);
            commit('set_random_quote', filtered_quotes[0]);
            filtered_quotes = state.quotes;
            commit('reset_shown_quotes');
            return;
        }
        let max = filtered_quotes.length;
        let random_num = Math.floor(Math.random() * max);
        let random_quote = filtered_quotes.at(random_num);
        console.log(filtered_quotes.length, random_quote, random_num, state.shown_quotes.length);
        if (random_quote) {
            commit('add_quote_to_shown', random_quote.id);
            commit('set_random_quote', random_quote);
        }
    }

}