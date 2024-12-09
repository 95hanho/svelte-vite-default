import wrap from "svelte-spa-router/wrap";
import Main from "./routes/Main.svelte";
import Test from "./routes/Test.svelte";

const routes = {
	"/": wrap({
		component: Main,
	}),
	"/test": wrap({
		async asyncComponent() {
			return Test;
		},
	}),
};

export default routes;
