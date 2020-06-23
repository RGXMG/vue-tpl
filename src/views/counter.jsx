export default {
  name: 'Counter',
  methods: {
    plus() {
      console.log(this.$store);
      this.$store.dispatch('counter/plus');
    },
    reduce() {
      this.$store.dispatch('counter/reduce');
    },
    delayPlus() {
      this.$store.dispatch('counter/delayPlus');
    },
  },
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>{this.$store.state.counter.count}</h2>
        <el-button onClick={this.plus}>+1</el-button>
        <el-button onClick={this.reduce}>-1</el-button>
        <el-button onClick={this.delayPlus}>delay +1</el-button>
      </div>
    );
  },
};
