<template>
    <div id="app">
        <link rel="stylesheet" href="https://at.alicdn.com/t/font_ygwucap6wn91wcdi.css">
        
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
            ></Foot>
        </transition> 
    
        <transition name='play-show'>
            <Playpage :musicNow='music_now' @showPlayPage='showPlayPage' v-if='show_play_page' 
            :playPause='playPause' @play_pause='play_pause'
            ></Playpage>
        </transition>
                

       
        <audio :src='src' autoplay id= 'audio'></audio>
    </div>
</template>

<script>
import Foot from '@/components/footer.vue'
import Vheader from '@/components/header.vue'
import Playpage from '@/components/play-page.vue'
import Vue from 'vue'

export default {
    name: 'app',
    data:function(){
        return{
            show_play_page:false,
            duration:0,
            currentTime:0,
            playPause:true
        }
    },
    computed:{
        src:function(){
            return './static/music/'+this.music.music_now().src
        },
        music_now:function(){
            var obj={
                autor:this.music.music_now().autor,
                background:this.music.music_now().background,
                lrc:this.music.music_now().lrc,
                name:this.music.music_now().name,
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
        }
    },
    mounted:function(){
        var audio=document.querySelector('audio');
        this.audio=audio;
        var self=this;
        audio.oncanplay=function(){
            self.duration=audio.duration;
        }
        audio.ontimeupdate = function(){
            self.currentTime=audio.currentTime;
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
