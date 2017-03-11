<template>
  <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th width="10%">id</th>
                  <th width="30%">name</th>
                  <th width="40%">content</th>
                  <th width="20%">remark</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="data in tableList">
                  <td v-text="data.num"></td>
                  <td v-text="data.author"></td>
                  <td v-text="data.contents"></td>
                  <td v-text="data.remark"></td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="4">
                      <div class="pull-left">
                          <button class="btn btn-default" v-on:click="refresh">刷新</button>
                      </div>
                      <div class="pull-right">
                          <boot-page :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param"></boot-page>
                      </div>
                  </td>
              </tr>
          </tfoot>
  </table>
</template>

<script>
export default {
  data: function() {
    return {}
  }
}
</script>
