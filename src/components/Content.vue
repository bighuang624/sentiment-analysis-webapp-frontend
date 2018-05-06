<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <img class="logo" src="../../static/logo.png" alt="logo">
                    <span class="title">中文短文本情感分析</span>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="else" theme="light" width="auto" :open-names="['1']" @on-select='changePage'>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="heart"></Icon>
                                基于 SnowNLP
                            </template>
                            <MenuItem name="else"><Icon type="document-text"></Icon>各类文本</MenuItem>
                            <MenuItem name="douban_snowNLP"><Icon type="document-text"></Icon>豆瓣评论</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="heart"></Icon>
                                基于词袋模型
                            </template>
                            <!-- <MenuItem name="else"><Icon type="chatbubbles"></Icon>各类文本</MenuItem> -->
                            <MenuItem name="douban_wb"><Icon type="document-text"></Icon>豆瓣评论</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="heart"></Icon>
                                基于 Tf-idf 算法
                            </template>
                            <MenuItem name="hotel_tfidf"><Icon type="home"></Icon>酒店评论</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '24px 36px', minHeight: '500px', minWidth: '400px' ,background: '#fff'}">
                        <Input v-model="sentence" type="textarea" :autosize="{minRows: 3,maxRows: 7}" placeholder="请输入需要分析的短文本"></Input>
                        <div class="button-group">
                            <Button type="info" @click="predict">开始预测</Button>
                            <Button type="success" @click="randomPredict">随便测测</Button>
                        </div>
                        <div class="result">
                            <span>情感指数：</span>
                            <transition name="fade">
                                <p v-text="score" class="animated" v-if="hasResult"></p>
                            </transition>
                        </div>
                        <div class="instruction">
                            <span>使用说明：</span>
                            <ul>
                                <li>文本框中输入文本点击“开始预测”按钮可得情感指数</li>
                                <li>点击“随便测测”按钮可以对随机生成的文本进行情感分析和指数展示</li>
                                <li>情感指数为 0-5 区间内任意值，对应情感为讨厌到喜欢，情感指数越低表示越消极，反之越积极</li>
                            </ul>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import {send} from '../api/index';
import { Message } from 'iview';

export default {
    data () {
        return {
            sentence: '',
            score: undefined,
            type: 'else',
            hasResult: false
        }
    },
    methods: {
        predict() {
            if(this.sentence === '') {
                Message.error({
                    content: '输入不能为空。试着写点什么吧！',
                    duration: 3
                });
            } else {
                this.hasResult = false;
                send({
                    "sentence": this.sentence,
                    "type": this.type
                }).then((response) => {
                    this.score = response
                    this.hasResult = true
                })
            }
        },
        randomPredict() {
            let randomWords = [
                '在所有人事已非的景色里，我最喜欢你',
                '经历了人生百态世间的冷暖，这笑容温暖纯真',
                '爱是一道光如此美妙，指引我们想要的未来',
                '上菜巨慢不说，服务态度还超级差，东西咸的要死，而且普遍的贵，这辈子不会再来了。',
                '饥饿营销的噱头...味道比北京差远了，服务也很差',
                '挺好的，菜品比较全，种类多，添加也快',
                '已经多次消费了，超棒的，人好多。',
                '非常不愉快的用餐体验，以后不来了',
                '喜欢的一家店，菜不错，环境也喜欢',
                '什么破地方，说能刷卡，到那又不能刷，简直太懒了',
                '很难吃啊，又超级贵，菜量特别少，没什么亮点，真的不推荐来这家店'
            ]

            this.sentence = randomWords[Math.floor(Math.random() * randomWords.length)]
            this.predict()
        },
        changePage(pageName) {
            this.type = pageName;
        }
    }
};
</script>

<style scoped>
.logo {
    height: 28px;
    margin-top: 18px; 
    margin-right: 10px; 
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.title {
  color: #f5f7f9;
  font-size: 24px;
  position: absolute;
  top: 4px;
}

.button-group {
    float: right;
    margin-top: 14px; 
}

.button-group button {
    margin-left: 12px; 
}

.result {
    margin-top: 60px;
    height: 200px;
}

.result > p {
    text-align: center;
    font-size: 3em;
    margin-top: 1em; 
}

.result, .instruction {
    font-size: 16px;
}

.instruction {
    margin-top: 2em;
}

.instruction > ul {
    margin-left: 2em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>