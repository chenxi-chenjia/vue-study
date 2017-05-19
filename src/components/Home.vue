<template>
    <div class="home">
        <div class="container-fluid">
            <ul>
                <li class="middle-group"
                v-for='(v,i) in music_list'
                >
                    <div class="avatar"
                    :style='{backgroundImage:"url(./static/photo/"+v.autor+"1.jpg)"}'
                    ></div>
                    <h5 class="middle-inline_block"><span>{{i+1}}. </span>{{v.name}}</h5>
                    <div class="delete-box middle-group">
                         <div class="delete middle-inline_block iconfont icon-shanchu"
                         @touchend='remove'></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
       
    }
  },
  methods:{
    remove:function(){
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.home{
  height: 100%;
  padding-bottom: 100px;
  padding-top: 100px;
}
li{
    height: 50px;
    position: relative;
    padding-left: 65px;
    padding-right: 20px;

}
.avatar{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-position: center;
    background-size: cover;
}
.delete-box{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 0 15px;

}
li+li{
    border-top: 1px solid #ddd;
}
h5{
    margin: 0;
    padding-left: 20px;
    position: relative;
    span{
        position: absolute;
        left: 0;
    }
}
</style>
