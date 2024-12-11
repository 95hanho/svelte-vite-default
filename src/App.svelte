<script>
	import { onMount } from "svelte";
  import Router, {} from "svelte-spa-router";
	import routes from "./routes";
	import Nav from "./components/nav.svelte";
	import TestLogin from "./components/testLogin.svelte";
	import { cookies } from "./cookies";
	import { loginOn } from "./store/authSlice";
	import Modal from "./components/modal.svelte";

  onMount(() => {
    const rToken = cookies.get('refresh_token');
    if(rToken) loginOn.set(true);
  });
</script>

<main>
  <header></header>
  <Nav />
  <TestLogin />
  <h3>스벨트 기본</h3>
  <h4>* 스벨트 기본 구성</h4>

  <Router {routes} />
</main>
<Modal />

<style>

</style>
