import Vue from 'vue'
import moment from 'moment';

Vue.filter('date', (timestamp)=>{
    return moment(new Date(timestamp)).fromNow();
})

Vue.filter('price', (price)=>{
    return price.toLocaleString();
})