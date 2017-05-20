import Home from '../views/Home.vue'
import User from '../views/use/Use.vue'
import Cate from '../views/cate/Cate.vue'
import Blog from '../views/blog/Blog.vue'
import Comment from '../views/comment/Comment.vue'
import Upload from '../views/upload/Upload.vue'


export const routes = [
	{path:'/',component:Home},
	{path:'/user',component:User},
	{path:'/cate',component:Cate},
	{path:'/blog',component:Blog},
	{path:'/comment',component:Comment},
	{path:'/upload',component:Upload}
]