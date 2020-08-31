import { toyService } from '../services/toy-service.js';
import { utilService } from '../services/util-service.js';

export const toyStore = {
  state: {
    toys: [],
    filterBy: { name: '', type: '', inStock: '' },
    sortBy: null
  },
  getters: {
    toys(state) {
      return state.toys
    },
    toysForDisplay(state) {
      if (!state.filterBy) return state.toys;
      if (state.filterBy.name) {
        return state.toys.filter(toy => {
          // console.log('TODO IN FILTER:', toy);
          const currToy = toy.name.toLowerCase();
          return currToy.includes(state.filter.name.toLowerCase())
        });
      }
      // if (state.filterBy.status) {
      //   return toyService.filterByStatus(state.filterBy.status)
      // }
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },

    addToy(state, { toy }) {
      state.toys.unshift(toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(currToy => currToy._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    remove(state, toyId) {
      const idx = state.toys.findIndex(currToy => currToy._id === toyId)
      state.toys.splice(idx, 1)
    },
    updateFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    updateSortBy(state, { sortBy }) {
      state.sortBy = sortBy;
    }
  },
  actions: {
    async uploadImg(context, { ev }) {
      const img = await utilService.uploadImg(ev);
      console.log('IMG STORE: ', ev);

      return img;
    },
    async loadToys(context) {
      const filter = context.state.filterBy;
      const sort = context.state.sortBy;
      // console.log('IN STORE - FILTER: ', filter);
      // console.log('IN STORE - SORT: ', sort);
      // console.log('FILTERRRRRRRR;', filter);

      const toys = await toyService.query(filter, sort)
      // console.log('IN STORE: ', toys);
      context.commit({ type: 'setToys', toys })

      return toys
    },
    async loadToy(context, { toyId }) {
      const toy = await toyService.getById(toyId)
      return toy;

    },
    async saveToy(context, { toy }) {
      const isEdit = !!toy._id
      const savedToy = await toyService.save(toy)
      context.commit({
        type: (isEdit) ? 'updateToy' : 'addToy',
        toy: savedToy
      })
      return savedToy;
    },
    async removeToy(context, { toyId }) {
      const toy = await toyService.remove(toyId)
      context.commit({ type: 'remove', toyId })
    },
  }
}