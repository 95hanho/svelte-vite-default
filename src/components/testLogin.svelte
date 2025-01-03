<script>
  import { onMount } from "svelte";
	import { testService } from "../api";
	import { loginOn } from "../store/authSlice";
	import { modal_alert } from "../store/modalSlice";

    const user = {
        id: "test",
        pwd :"1234",
    }

    const login_before = () => {
        console.log(user);

        if(!user.id || !user.pwd) {
            modal_alert.open('아이디, 비번을 입력해주세요.');
        } else {
            testService.login(user).then((data) => {
                console.log(data);
                loginOn.login(data.access_token, data.refresh_token);
            }).catch((data) => {
                console.log(data);
                modal_alert.open(data.msg);
            });
        }
    }

    onMount(() => {
        testService.test().then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    })
</script>

<div id="testLogin">
    {#if !$loginOn}
    <form on:submit|preventDefault={login_before}>
        아이디 : <input type="text" bind:value={user.id}><br />
        비밀번호 : <input type="password" bind:value={user.pwd}><br />
        <input type="submit" value="제출">
    </form>
    {:else}
    <div>
        <button on:click={loginOn.logout}>로그아웃</button>
    </div>
    {/if}
    
</div>

<style></style>