<style lang="less" scoped>
@priCo:#555555;
.cusCo{
 color: @priCo+#111111;
}
</style>

<template>
    <div>
        <head-top></head-top>
       
    </div>
</template>
<script>
import headTop from '@/components/headTop.vue';
export default {
    components:{
       'head-top': headTop
    }
}
</script>

