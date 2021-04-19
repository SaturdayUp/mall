<template>
  <div id="category">
    <!-- 顶部标题栏   -->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!-- 中部内容区   -->
    <div class="content">
      <!-- 内容区左侧分类导航栏 -->
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <!--  内容区右侧具体商品信息    -->
      <scroll id="tab-content" >
        <div>
          <!--   右侧具体商品信息的分类     -->
          <tab-content-category :subcategories="showSubCategory"></tab-content-category>
          <!--  右侧的tab-control标题栏    -->
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"></tab-control>
          <!--   右侧详细信息商品栏     -->
          <tab-content-detail :categories-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabMenu from "@/views/category/childComponents/TabMenu";
import Scroll from "@/components/common/scroll/Scroll";
import TabContentCategory from "@/views/category/childComponents/TabContentCategory";
import TabControl from "@/components/common/tabControl/TabControl";
import TabContentDetail from "@/views/category/childComponents/TabContentDetail";
import {_getCategory,_getSubCategory,_getCategoryDetail} from "@/network/category";

export default {
  name: "Category",
  components:{
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  data(){
    return{
      categories:[],
      categoryData:{},
      currentIndex:-1,
      currentType: 'pop'

    }
  },
  created() {
    //1.在组件被创建的时候请求分类数据
    this.getCategory()
  },
  computed:{
    showSubCategory(){
      // console.log(this.currentIndex);
      if (this.currentIndex===-1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      console.log(this.currentType);
      if (this.currentIndex===-1) return {}
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods:{
    getCategory(){
      _getCategory().then(res=>{
        // console.log(res);
        //1.获取分类数据
        this.categories=res.data.category.list
        // console.log(this.categories);
        //2.遍历所有的分类，初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i]={
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        //3.请求第一个分类的数据
        this.getSubCategory(0)
      })
    },
    getSubCategory(index){
      this.currentIndex=index
      // console.log(this.currentIndex);
      const maitKey=this.categories[index].maitKey
      // console.log(maitKey);
      _getSubCategory(maitKey).then(res=>{
        // console.log(res);
        //根据maitKey去请求分类下边的子分类，来展示
        this.categoryData[index].subcategories=res.data
        this.categoryData={...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },
    getCategoryDetail(type){
      //1.获取请求得miniWallkey
      const miniWallkey=this.categories[this.currentIndex].miniWallkey
      //2.发送请求，传入miniWallkey和type
      _getCategoryDetail(miniWallkey,type).then(res=>{
        //3.将获取到的数据保存下来
        // console.log(res);
        this.categoryData[this.currentIndex].categoryDetail[type]=res
        this.categoryData={...this.categoryData}
      })
    },

    /**
     * 根据tabmenu发过来的事件，请求不同的数据
     */
    selectItem(index){
      //请求数据
      this.getSubCategory(index)
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType);
    }
  }
}
</script>

<style scoped>
#category{
  height: 100vh;
}
.nav-bar{
  background-color: #FF852A;
  color: #fff;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
}
#tab-content{
  flex: 1;
  height: 100%;
}
</style>