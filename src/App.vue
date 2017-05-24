<template>
    <div id="app">
        <link rel="stylesheet" href="https://at.alicdn.com/t/font_udjrwkqimeljtt9.css">
        
        <transition-group name='page-view'>
             <template v-if='!show_play_page'>
                <Vheader key='header'></Vheader>
                <router-view key='router'></router-view>
            </template>
        </transition-group>
           
            
        

        <transition name='footer-show' >
            <Foot :musicNow='music_now'  
            @showPlayPage='showPlayPage' v-if='!show_play_page'
            :playPause='playPause' @play_pause='play_pause'
            @cut_music='cut_music'
            :cutList='cut_list' :cutType='cut_type' @cut_type_choose='cut_type_choose'
            ></Foot>
        </transition> 
    
        <transition name='play-show'>
            <Playpage :musicNow='music_now' @showPlayPage='showPlayPage' v-if='show_play_page' 
            :playPause='playPause' @play_pause='play_pause'
            @cut_music='cut_music'
            @play_time='play_time'
            :cutList='cut_list' :cutType='cut_type' @cut_type_choose='cut_type_choose'
            :voice='voice' @voice_change='voice_change'
            ></Playpage>
        </transition>
                

       
        <audio :src='src' autoplay id= 'audio' ></audio>
    </div>
</template>

<script>
import Foot from '@/components/footer.vue'
import Vheader from '@/components/header.vue'
import Playpage from '@/components/play-page.vue'
//切歌 next prev random cycle

export default {
    name: 'app',
    data:function(){
        return{
            show_play_page:false,
            duration:0,
            currentTime:0,
            playPause:true,
            cut_type:0,
            cut_list:[
                {
                    name:'next',
                    value:'icon-shunxubofang'
                },{
                    name:'random',
                    value:'icon-qiatong-suijibofang'
                },{
                    name:'cycle',
                    value:'icon-danquxunhuan'
                }
            ],
            voice:0
        }
    },
    computed:{
        music_list:function(){
            return this.$store.state.music_list;
        },
        music_num:function(){
            return this.$store.state.music_num;
        },
        src:function(){
            return './static/music/'+this.$store.state.music_list[this.$store.state.music_num].src
        },
        music_now:function(){
            var obj={
                autor:this.$store.state.music_list[this.$store.state.music_num].autor,
                background:this.$store.state.music_list[this.$store.state.music_num].background,
                lrc:this.$store.state.music_list[this.$store.state.music_num].lrc,
                name:this.$store.state.music_list[this.$store.state.music_num].name,
                duration:this.duration,
                currentTime:this.currentTime
            }
            return obj;
        }
    },
    components:{
        Foot,
        Vheader,
        Playpage
    },
    methods:{
        showPlayPage:function(flag){
            this.show_play_page=flag;
        },
        play_pause:function(flag){
            this.playPause=flag;
            if(flag){
                this.audio.play();
            }else{
                this.audio.pause();
            }
        },
        play_time:function(e){
            this.audio.currentTime=e;
        },
        cut_music:function(e){
            if(this.cut_list[this.cut_type].name=='cycle'){
                this.audio.currentTime=0;    
            }else{
                var type=e==undefined?'next':e;
                if(this.cut_list[this.cut_type].name=='random'){
                    type='random';
                }
                this.$store.commit('cut',type)
            }
                
        },
        cut_type_choose:function(e){
            this.cut_type++;
            if(this.cut_type>=this.cut_list.length){
                this.cut_type=0;
            }
        },
        voice_change:function(e){
            this.audio.volume=e;
        }
    },
    mounted:function(){
        var audio=document.querySelector('audio');
        this.audio=audio;
        var self=this;
        audio.oncanplay=function(){
            self.duration=audio.duration;
            self.voice=audio.volume;
        }
        audio.ontimeupdate = function(){
            self.currentTime=audio.currentTime;
        }
        audio.onended = function(){
            if(self.cut_list[self.cut_type].name=='cycle'){
                self.audio.currentTime=0;    
            }else{
                var type='next';
                if(self.cut_list[self.cut_type].name=='random'){
                    type='random';
                }
                self.$store.commit('cut',type)
            }
        }
        audio.onvolumechange = function(){
            self.voice=audio.volume;
        }
    }
}
</script>

<style lang='scss'>
$Hwidth:320px,360px,375px,412px,414px,768px;
$Swidth:750px;
@each $i in $Hwidth{
    @media screen and (min-width:#{$i}){
        html{
            font-size:100px * $i / $Swidth;
        }
    } 
}
html,body,#app{
	width: 100%;
	height: 100%;
}


.play-show-enter-active{
    transform: rotate(180deg);
}
.play-show-enter-to{
    transform: rotate(0);
}
.play-show-leave-active{
    transform: rotate(180deg);
}


.footer-show-enter-active{
    transform: translateY(120%);
    opacity: 0;
}
.footer-show-enter-active-to{
    transform: translateY(0);
    opacity: 1;
}
.footer-show-leave-active{
    transform: translateY(120%);
    opacity: 1;
}
.footer-show-leave-active-to{
    transform: translateY(120%);
    opacity: 0;
}
.page-view-enter-active,.page-view-leave-active{
    transition: all .5s ease-in-out;
}
.page-view-enter-active{
    opacity: 0;
}
.page-view-enter-to{
    opacity: 1;
}
.page-view-leave-active{
    opacity: 1;
}
.page-view-leave-to{
    opacity: 0;
}
</style>
