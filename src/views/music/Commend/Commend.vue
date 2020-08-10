<template>
  <div class="Commend">
    <classify-module title="听友评论" no-more>
      <command-strip
          v-for="commend in commendList"
          :key="commend['id']"
          :commandData="commend"
      >
      </command-strip>
    </classify-module>
  </div>
</template>

<script>

import classifyModule from '@/components/public/classifyModule'
import commandStrip from '@/components/public/commandStrip/commandStrip';

import {getCommend} from '@/netWork/musicDetail/request';
import {inError} from '@/tools/tools';

export default {
  props: ['mid'],
  data() {
    return {
      commendList: []
    }
  },
  mounted() {
    getCommend({
      id: this.mid,
      limit: 30,
      offset: this.offset
    }).then((data) => {
      console.log(data);
      this.commendList = data['comments']
    }).catch((error) => {
      inError.call(this, '歌曲评论', error);
    });
  },
  components: {
    commandStrip,
    classifyModule
  }
};
</script>
