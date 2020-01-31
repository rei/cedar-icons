<template>
<div class="page-wrap">
  <div class="cdr-container cdr-py-space-four-x">
    <cdr-text
      tag="h1"
      modifier="heading-serif-strong-700 heading-serif-strong-900@md heading-serif-strong-1100@lg"
      class="cdr-text-center"
    >@rei/cedar-icons</cdr-text>

    <router-view :icon-data="iconData"/>

  </div>
</div>
</template>

<script>
import { CdrText } from '@rei/cedar';

import iconData from './lib/icons';

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
}
</script>

<style lang="scss">
@import '~@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import '~@rei/cdr-component-variables/dist/scss/index.scss';
@import '~@rei/cedar/dist/cdr-fonts.css';
@import '~@rei/cedar/dist/cedar-compiled.css';

html {
  height: 100%;
  background-color: $cdr-color-background-light;
}

.router-link {
  @include cdr-link-base-mixin;
  @include cdr-link-standalone-mixin;
}

.page-wrap {
  background-color: $cdr-color-background-light;
}
</style>
