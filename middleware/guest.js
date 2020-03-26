export default function ({ store, redirect }) {
  console.log(store.state);
  
  if (!store.getters['auth/noAuth']) {
    console.log('redirect')
    return redirect({
      name: 'index'
    })
  }
}