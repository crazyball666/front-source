<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <el-table :data="articleList" empty-text="暂无数据" border>
      <el-table-column prop="p_id" label="ID" align="center" class-name="column-content" width="120"> </el-table-column>
      <el-table-column prop="title" label="标题" align="center" class-name="column-content"> </el-table-column>
      <el-table-column prop="tags" label="标签" align="center" class-name="column-content"> </el-table-column>
      <!-- <el-table-column prop="name" label="简介" align="center" class-name="column-content"> </el-table-column> -->
      <el-table-column prop="read_count" label="阅读数" align="center" class-name="column-content" width="80">
      </el-table-column>
      <el-table-column prop="like_count" label="点赞数" align="center" class-name="column-content" width="80">
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" class-name="column-content"> </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="articleCount"> </el-pagination>
  </div>
</template>

<script>
import blogApi from '../api/blog';
export default {
  data: () => {
    return {
      articleList: [],
      articleCount: 100,
    };
  },
  async mounted() {
    let data = await blogApi.getArticleList();
    this.articleList = data.articles;
    // this.articleCount = Math.ceil(data.count / 5);
    console.log(data);
  },
};
</script>

<style lang="scss" scoped>
.column-content div {
  font-size: 12px;
  color: red;
  background: red;
}
.article-list {
}
</style>
