<template>
  <div class="propagate">
    <div class="logo">
      <img src="../assets/imgs/postage.jpg" width="100%" height="200">
    </div>
    <div class="content">
      <div class="left">
        <router-view/>
      </div>
      <div class="right">
        <div class="vedio_content">
          <video controls="controls" width="320" height="240" class="video" preload="auto">
            <source type="video/mp4" src="../assets/vedio/1.mp4">
            您的浏览器暂时无法播放此视频.
          </video>
        </div>
        <div class="figure_detail">
          打卡超美味河豚料理 拿手好菜竟是“日本乱炖”？
        </div>
        <div class="vedio_content">
          <video controls="controls" width="320" height="240" class="video" preload="auto">
            <source type="video/mp4" src="../assets/vedio/1.mp4">
            您的浏览器暂时无法播放此视频.
          </video>
        </div>
        <div class="figure_detail">
          打卡超美味河豚料理 拿手好菜竟是“日本乱炖”？
        </div>
        <div class="vedio_content">
          <video controls="true" width="320" height="240" class="video" preload="auto">
            <source type="video/mp4" src="../assets/vedio/1.mp4">
            您的浏览器暂时无法播放此视频.
          </video>
        </div>
        <div class="figure_detail">
          打卡超美味河豚料理 拿手好菜竟是“日本乱炖”？
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
  .propagate {
    width: 70%;
    margin: 0 auto;
    padding: 10px;
    overflow-x: hidden;

    .content {
      width: 100%;
      border: 1px solid rgba(242, 247, 253);
      border-radius: 3px;

      .left {
        float: left;
        width: 70%;
      }

      .right {
        float: right;
        width: 30%;
        padding-top: 70px;

        .vedio_content {
          width: 250px;
          height: 150px;
          background-color: #000;
          margin-top: 10px;

          .video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .figure_detail {
          font-size: 14px;
          text-align: left;
          margin-top: 10px;
          line-height: 20px;
        }
      }
    }
  }
</style>
