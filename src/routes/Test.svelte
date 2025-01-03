<script>
	import { onMount } from "svelte";
	import { testService } from "../api";
	import { userInfo } from "../store/authSlice";
	import { modal_alert } from "../store/modalSlice";

    let fileName = "";
    let uploadFile = null;

    const fileUpload_before = () => {
        if(uploadFile && uploadFile.length > 0) {
            testService.file_upload({ file:uploadFile }).then((data) => {
                modal_alert.open('파일 업로드 완료!!');
            }).catch((err) => {
                modal_alert.open('파일 업로드 실패!! 관리자 확인 ㅠㅜ');
            })
        } else {
            modal_alert.open('업로드 할 파일이 없습니다.');
        }
    }
    const fileDownload_before = () => {
        if(fileName) {
            testService.file_download().then((res) => {
                const contentDisposition = res.headers['content-disposition'];
                const fileName = contentDisposition.split("filename=")[1].replace(/\'\'/g, '');
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = decodeURIComponent(fileName);
                link.click();
                link.remove();
            }).catch((err) => {
                modal_alert.open('파일 다운로드 실패!! 관리자 확인 ㅠㅜ');
            });
        }
    }

    $: if($userInfo.name) {
        testService.get_myfileName().then((data) => {
            fileName = data.fileName || "파일 없음";
        });
    }

    onMount(() => {
        // testService.test().then((data) => {
        //     console.log(data);
        // });
    });
</script>

<div id="test">
    <h1>테스트페이지</h1>
    <hr>
    <div>
        <h3>파일업로드/다운로드 테스트</h3>
        <div>
            <input type="file" bind:files={uploadFile}>
            <button type="button" on:click={fileUpload_before}>파일업로드</button><br />
            <button type="button" class="file-btn" on:click|preventDefault={fileDownload_before}>{fileName}</button>
        </div>
    </div>
    
</div>

<style>
    .file-btn {
        background: none;
        border:none;
    }
    .file-btn.haveFile {
        text-decoration: underline;
        color:#00f;
    }
</style>