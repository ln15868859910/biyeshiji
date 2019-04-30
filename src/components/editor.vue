<template>
    <div id="editor">
        <div ref="editorElem"  v-html="htmlcontent" style="text-align:left;width: 90%;
    background: white;"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editorContent: '',
      htmlcontent: '',
      htmlcontent: ''
    }
  },
  props: ['catchData', 'content'],
  mounted () {
    console.log(this.content)
    var editor = new E(this.$refs.editorElem) // 创建富文本实例
    editor.customConfig.onchange = (html) => {
      this.catchData(html) // 把这个html通过catchData的方法传入父组件
    }
    editor.customConfig.uploadImgServer = 'http://localhost:3000/api/upload'
    editor.customConfig.uploadFileName = 'mypic'
    editor.customConfig.uploadImgMaxLength = 10
    editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 将图片大小限制为 3M
    editor.customConfig.showLinkImg = false
    // 下面是最重要的的方法
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        console.log(files)
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        console.log('上传成功')
      },
      fail: function (xhr, editor, result) {
        console.log('上传失败,原因是' + result)
      },
      error: function (xhr, editor) {
        console.log('上传出错')
      },
      timeout: function (xhr, editor) {
        console.log('上传超时')
      },
      customInsert: function (insertImg, result, editor) {
        console.log(' 图片上传并返回结果')
        console.log(result)
        var url = result.url
        insertImg(url)
      }
    }
    console.log(editor)
    editor.create()
    editor.txt.html(this.content)
  }
}
</script>

<style>

</style>
