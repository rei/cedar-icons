<template>
  <div class="cdr-text-center">
    <router-link
      to="/sprite"
      v-show="$route.name !== 'sprite'"
      class="router-link"
    >To Sprite Creator</router-link>

    <cdr-text class="cdr-my-space-one-x">Click on an icon below to download the source svg</cdr-text>

    <cdr-input
      v-model="searchTerm"
      :placeholder="`Search ${totalIcons} icons`"
      hide-label
      label="Search icons"
      class="cdr-my-space-two-x"
    />

    <cdr-row cols="2 3@sm 4@md 6@lg">
      <cdr-col
        v-for="(v, k) in filteredIcons"
        :key="k"
      >
        <cdr-link
          download
          :href="`${publicPath}icons/${k}.svg`"
          modifier="standalone"
        >
          <cdr-card class="cdr-space-inset-one-x full-height">
            <cdr-icon
              size="large"
            >
              <html-fragment :html="v" />
            </cdr-icon>
            <cdr-text>{{k}}</cdr-text>
          </cdr-card>
        </cdr-link>
      </cdr-col>
    </cdr-row>
  </div>
</template>

<script>
import HtmlFragment from '../components/HtmlFragment';
import { CdrText, CdrRow, CdrCol, CdrInput, CdrIcon, CdrLink, CdrCard } from '@rei/cedar';

import pickBy from 'lodash/pickBy';
import merge from 'lodash/merge';
import tags from '../tags';

export default {
  name: 'Search',
  components: {
    HtmlFragment,
    CdrText,
    CdrRow,
    CdrCol,
    CdrInput,
    CdrIcon,
    CdrLink,
    CdrCard,
  },
  props: [
    'iconData'
  ],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      searchTerm: '',
    }
  },
  computed: {
    totalIcons() {
      return Object.keys(this.iconData).length;
    },
    filteredIcons() {
      // no search term, return everything
      if(this.searchTerm == '') return this.iconData;

      // filter by icon name
      const filteredByKey = pickBy(this.iconData, (v,k) => k.includes(this.searchTerm));

      // filter by associated terms
      function stringArrayContains(array, str) {
        function contains(el) {
          return (el.indexOf(str) !== -1) ? true : false;
        }

        return array.some(contains);
      }

      const filteredByTag = pickBy(this.iconData, (v,k) => {
        const tagKeys = Object.keys(
          pickBy(tags, (arr) => stringArrayContains(arr, this.searchTerm))
        );

        return tagKeys.includes(k);
      });


      // combine to single data set
      const filteredData = merge(filteredByKey, filteredByTag);

      return filteredData;
    },
  },
}
</script>

<style lang="scss">
.full-height {
  height: 100%;
}
</style>
