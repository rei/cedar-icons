<script>
import Vue from 'vue/dist/vue.esm';

export default {
  name: 'HtmlFragment',
  functional: true,
  props: ['html'],
  render(h, ctx) {
    const nodes = new Vue({
      beforeCreate() { this.$createElement = h }, // not necessary, but cleaner imho
      template: `${ctx.props.html}`
    }).$mount()._vnode.children
    return nodes
  }
}
</script>