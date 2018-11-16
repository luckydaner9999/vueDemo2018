<template>
    <div>
       <!-- <head-top></head-top> -->
       <router-view></router-view>
    </div>
</template>
<script>
import headTop from '@/components/headTop.vue';
import funcTemp from './demo/funcTemp.vue';

export default {
     data:{
            items:[
                {
                    name:'a',
                    id:0
                },
                {
                    name:'b',
                    id:1
                },
                {
                    name:'c',
                    id:2
                }
            ]
        },
    components:{
       'head-top': headTop,
       funcTemp
    }
}
</script>
