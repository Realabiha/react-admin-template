import lazy from 'react-loadable';
export default function lazyLoad(loader){
  return function(loading){
    loading = loading || function(){return (<div>LOADING...</div>)}
    return lazy({
      loader,
      loading
    })
  }
}