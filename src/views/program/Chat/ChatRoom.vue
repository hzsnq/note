<script lang="ts" setup>
// import { wrapperEnv } from '@/utils/env'
// const { VITE_WEBSOCKET_PATH } = wrapperEnv
// const signalingServer = new WebSocket(VITE_WEBSOCKET_PATH);
// // console.log(signalingServer);
// let currentNickname = ""
// signalingServer.onopen = () => {
//     console.log("Connected to signaling server");

//     // 读取保存的昵称
//     const match = document.cookie.match(/nickname=([^;]+)/);
//     if (match) {
//         currentNickname = decodeURIComponent(match[1]);
//     }

//     setInterval(() => {
//         signalingServer.send(JSON.stringify({ type: "9999" }));
//     }, 1000 * 10);
// };

// signalingServer.onmessage = ({ data: responseStr }) => {
//     const response = JSON.parse(responseStr);
//     const { type, data } = response;
//     console.log(type, data);

//     if (type === "1001") {
//         // me.id = data.id;
//         // // 如果有保存的昵称，发送给服务器
//         // if (currentNickname) {
//         //     signalingServer.send(
//         //         JSON.stringify({
//         //             uid: me.id,
//         //             targetId: me.id,
//         //             type: "9004",
//         //             data: { nickname: currentNickname },
//         //         })
//         //     );
//         // }
//         return;
//     }
//     if (type === "1002") {
//         // refreshUsers(data);
//         return;
//     }
//     if (type === "1003") {
//         // joinedRoom();
//         return;
//     }
//     if (type === "1004") {
//         // addCandidate(data);
//         return;
//     }
//     if (type === "1005") {
//         // joinConnection(data);
//         return;
//     }
//     if (type === "1006") {
//         // joinedConnection(data);
//         return;
//     }
//     if (type === "1007") {
//         // const user = users.find((u) => u.id === data.id);
//         // if (user) {
//         //     user.nickname = data.nickname;
//         //     // refreshUsersHTML();
//         // }
//         return;
//     }
// };
// const source = ref('https://fagedongxi.com/')
</script>

<template>
    <!-- <iframe :src="source" width="600" height="600" frameborder="0" allowfullscreen></iframe> -->
    <div>基于webRTC实现局域网内聊天与发送文件，正在实现ing</div>
</template>

<style lang="scss" scoped></style>