<template>
    <div>
        <Row style="height: 300px;
    overflow: auto;">
            <Col span="2">
             <ul>
               <li  v-for="n in 10"><a :href="'#id'+n">锚点{{n}}</a>  </li>
              
           </ul>
            </Col>
            <Col span="22" >
            <div v-for="n in 10" :id="'id'+n" style="height:200px">
                反反复复付付付付付付付付付付付{{n}}
            </div>
            </Col>

        </Row>
     
    </div>
</template>
