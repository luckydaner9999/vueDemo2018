<template>
    <div>
        <h3>func</h3>
       <smart-list :items=items></smart-list>
    </div>
</template>
<script>
import Vue from 'vue';
//当父组件传过来的是空items时
    var EmptyList = {template: '<p>Empty list</p>'};
    //当父组件传来的items元素为对象类型时
    var TableList = 'ul'
    // 当父组件定义了isOrdered变量且为true
    var UnorderedList = 'ul'
 
    //定义组件
    Vue.component('smart-list', {
        //标记为函数式组件
        functional: true,
 
        //render函数
        render: function (createElement, context) {
            // console.log(context)//若不理解可以打印出来context来看看里面都有些什么东西
 
            //规定组件的渲染规则
            function appropriateListComp() {
                //获取父组件传来的数据
                var items = context.props.items;
 
                //若空，则返回前面定义的emptylist
                if (items.length === 0) return EmptyList;
                //若为对象
                if (typeof items[0] === 'object') return TableList;
                //其他
                return UnorderedList
            }
 
            //生成模板
            return createElement(
                //模板标记为渲染规则函数返回值
                appropriateListComp(),
                //模板子元素，返回一个数组
                Array.apply(null, {length: context.props.items.length}).map(function (value, index) {
                    return createElement('li',context.props.items[index].name)
                })
            )
        },
        props: {
            items: {
                type: Array,
                required: true
            },
            isOrdered: Boolean
        }
    });


export default {
    name:'funcTemp',
    data:{
        return:{
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
        }
    }
}
</script>

