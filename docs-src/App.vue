<template>
<div class="page-wrap">
  <div class="cdr-container cdr-py-space-four-x">
    <cdr-text
      tag="h1"
      modifier="display"
      class="cdr-text-center"
    >@rei/cedar-icons</cdr-text>

    <router-view :icon-data="flatData"/>

  </div>
</div>
</template>

<script>
import { CdrText } from '@rei/cedar';

import forOwn from 'lodash/forOwn';
import isObject from 'lodash/isObject';
import iconData from './lib/icons.esm';

export default {
  name: 'App',
  components: {
    CdrText,
  },
  data() {
    return {
      iconData,
      publicPath: process.env.BASE_URL,
      searchTerm: '',
    }
  },
  computed: {
    flatData() {
      let finalObj = {};

      const processObj = (srcObj, name='') => {
        forOwn(srcObj, (v,k) => {
          let fullName = name !== '' ? `${name}-${k}`: k;
          if(isObject(v)) {
            processObj(v, fullName);
          } else {
            finalObj[fullName] = v;
          }
        })
      }

      processObj(this.iconData);

      return finalObj;
    },
  },
}
</script>

<style lang="scss">
@import '~@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import '~@rei/cedar/dist/reset.css';
@import '~@rei/cedar/dist/cdr-fonts.css';
@import '~@rei/cedar/dist/cedar.css';
@import '~@rei/cedar/dist/utilities.css';

html {
  height: 100%;
  background-color: $cdr-color-background-light;
}

.page-wrap {
  background-color: $cdr-color-background-light;
}
</style>
