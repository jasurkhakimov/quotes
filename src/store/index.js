import Vue from 'vue';
import Vuex from 'vuex';
import { Module } from './modules';
import alertModule from './modules/alert';
import loadingModule from './modules/loading';

Vue.use(Vuex)

const state = {};
const actions = {};
const mutations = {};
const getters = {};

const modules = {
  [Module.ALERT]: alertModule,
  [Module.LOADING]: loadingModule,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules
})