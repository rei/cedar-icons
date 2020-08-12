<script>
import HtmlFragment from '../components/HtmlFragment';
import { CdrText, CdrRow, CdrCol, CdrIcon, CdrCard, CdrCheckbox, CdrButton } from '@rei/cedar';
import svgstore from 'svgstore';
import download from 'downloadjs';

export default {
  name: 'SpriteForm',
  components: {
    HtmlFragment,
    CdrText,
    CdrRow,
    CdrCol,
    CdrIcon,
    CdrCard,
    CdrCheckbox,
    CdrButton,
  },
  data() {
    return {
      formData: [],
      sprites: svgstore({
        svgAttrs: {
          xmlns: "http://www.w3.org/2000/svg",
          style: "display: none;"
        }
      }),
    }
  },
  props: [
    'iconData'
  ],
  methods: {
    makeSprite() {
      this.formData.forEach(icon => {
        this.sprites.add(icon, this.iconData[icon])
      });

      download(this.sprites.toString({ inline: true }), 'sprite.svg', 'image/svg+xml');
    }
  }
}
</script>
<template>
<div class="cdr-align-text-center">
  <router-link
    to="/"
    v-show="$route.name !== 'home'"
    class="router-link"
  >Back to Search</router-link>

  <cdr-text tag="h2" modifier="heading-serif-600 heading-serif-700@md heading-serif-700@lg" class="cdr-my-space-one-x">Sprite Creator</cdr-text>
  <cdr-text class="cdr-mb-space-two-x">Select icons and then click "Create Sprite" below to download</cdr-text>

  <form @submit.prevent="makeSprite">

    <cdr-row cols="2 3@sm 4@md 6@lg">
      <cdr-col
        v-for="(v, k) in iconData"
        :key="k"
      >
        <cdr-card>
          <cdr-checkbox
            v-model="formData"
            :custom-value="k"
            modifier="hide-figure"
            input-class="icon-box"
            label-class="icon-box__label"
            content-class="icon-box__content"
            class="icon-box__wrapper"
          >
            <cdr-icon
              size="large"
              inherit-color
            >
              <html-fragment :html="v" />
            </cdr-icon>
            <cdr-text>{{k}}</cdr-text>
          </cdr-checkbox>
        </cdr-card>
      </cdr-col>
    </cdr-row>
    <cdr-button type="submit" class="make-button">Create Sprite</cdr-button>
  </form>
</div>
</template>

<style lang="scss">
  @import '~@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

  .icon-box__wrapper {
    height: 100%;
  }
  
  .icon-box__label {
    width: 100%;
    height: 100%;
  }

  .icon-box__content {
    height: 100%;
    width: 100%;
    padding: $cdr-space-inset-one-x;
    border: 1px solid transparent;
  }

  .icon-box:checked ~ .icon-box__content {
    border: 1px solid $cdr-color-text-link-lightmode;
    color: $cdr-color-text-link-lightmode;
    fill: $cdr-color-text-link-lightmode;
  }

  .make-button {
    margin: $cdr-space-two-x auto;
    display: block;
  }
</style>
