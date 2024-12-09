<script>
	import { onMount } from "svelte";
	import { test } from "./api/services/testService";
  import Router, {} from "svelte-spa-router";
	import routes from "./routes";
	import Nav from "./components/nav.svelte";

  onMount(() => {
    test().then((data) => {
      console.log(data);
    });
  });
</script>

<main>
  <header></header>
  <Nav />
  <h3>스벨트 기본</h3>
  <h4>* 스벨트 기본 구성</h4>

  <Router {routes} />
</main>

<style>

</style>
