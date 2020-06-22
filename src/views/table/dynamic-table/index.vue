<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px">
      table.dynamicTips1
    </div>
    <fixed-thead />

    <div style="margin:30px 0 5px 20px">
      table.dynamicTips2
    </div>
    <unfixed-thead />
  </div>
</template>

<script>
import FixedThead from './components/FixedThead';
import UnfixedThead from './components/UnfixedThead';

export default {
  name: 'DynamicTable',
  components: { FixedThead, UnfixedThead },
};
</script>
