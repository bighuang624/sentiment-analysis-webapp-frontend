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
                    <Menu active-name="douban" theme="light" width="auto" :open-names="['1']" @on-select='changePage'>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                评论分析
                            </template>
                            <MenuItem name="douban"><Icon type="document-text"></Icon>豆瓣评论</MenuItem>
                            <MenuItem name="restaurant"><Icon type="pizza"></Icon>餐厅评论</MenuItem>
                            <MenuItem name="else"><Icon type="chatbubbles"></Icon>其他评论</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                其他分析
                            </template>
                            <MenuItem name="2-1"><Icon type="document-text"></Icon>其他文本</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
                        <Input v-model="sentence" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入需要分析的短文本"></Input>
                        <div class="button-group">
                            <Button type="info" @click="predict">开始预测</Button>
                            <Button type="success" @click="randomPredict">随便测测</Button>
                        </div>
                        <div class="result">
                            <span>情感指数：</span><span v-text="score"></span>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import {send} from '../api/index';

export default {
    data () {
        return {
            sentence: '',
            score: undefined,
            type: 'douban'
        }
    },
    methods: {
        predict() {
            if(this.sentence !== '') {
               send({
                   "sentence": this.sentence,
                   "type": this.type
               }).then((response) => {
                   this.score = response
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
    margin-top: 10px; 
}

.button-group button {
    margin-left: 8px; 
}

.result {
    margin-top: 10px;
}

.result span {
    font-size: 16px;
}
</style>