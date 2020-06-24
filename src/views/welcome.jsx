import dva from '@/assets/dva.jpg';
export default {
  name: 'Welcome',
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome To Vue Template</h2>
        <img src={dva} style="width: 50%" alt="" />
      </div>
    );
  },
};
